# The Algebra of Color Design

> **Context**: The physics and grammar of the Axiomatic Color system. ([View Changelog](./composition-algebra-changelog.md))

This document defines the "Physics" of the Axiomatic Color system. While the system is built on rigorous math, you can think of it using a simple grammatical analogy:

- **Context ($H, C$) is the Setting**: It's the lighting in the room. If the room is red, everything inside is tinted red. This "atmosphere" permeates everything.
- **Intent ($L$) is the Voice**: It's how loud you are speaking. You can whisper (Subtle) or shout (High).
- **Surfaces are Scene Changes**: When you walk into a new room (a Card, a Sidebar), the conversation resets. You stop shouting, but the lighting might stay the same.

Below, we formalize these intuitions into a set of rules that guarantee your UI always looks consistent.

## 1. The State Space ($\Sigma$)

The system state at any point in the DOM tree is defined by a vector $\Sigma$.

$$ \Sigma = \langle H, C, L\_{src}, \alpha \rangle $$

Where:

- $H \in [0, 360)$: **Context Hue**. The base hue for the current environment.
- $C \in [0, 1]$: **Context Chroma**. The base vibrancy for the current environment.
- $L_{src} \in \text{Token}$: **Intent Lightness**. A reference to a lightness token (e.g., `text-high`, `text-subtle`).
- $\alpha \in \{ \text{Light}, \text{Dark} \}$: **Polarity**. The local resolved mode.

> **In Plain English**: Think of $\Sigma$ as the "DNA" of the current element. It carries four genes: what color family we are in ($H$), how vibrant it is ($C$), how bright the text should be ($L_{src}$), and whether we are in light or dark mode ($\alpha$). Every element inherits this DNA from its parent.

## 2. The Resolution Function ($\Phi$)

The CSS Engine acts as a projection function $\Phi$ that maps the state vector $\Sigma$ to a concrete CSS color value.

$$ \Phi(\Sigma) \mapsto \text{ColorSpace}(\text{oklch}) $$

$$
\Phi(\langle H, C, L_{src}, \alpha \rangle) = \text{oklch}(\text{eval}(L_{src}, \alpha), C, H)
$$

Where $\text{eval}(L_{src}, \alpha)$ represents the **Late Binding** of the token. It is a lookup function into the token definition set:

$$
\forall t \in \text{Tokens}, \exists (l_{light}, l_{dark}) \text{ s.t. } \text{eval}(t, \alpha) = (\alpha = \text{Dark}) ? l_{dark} : l_{light}
$$

> **In Plain English**: $\Phi$ is the browser's rendering engine. It takes the DNA ($\Sigma$) and turns it into actual pixels. Crucially, it decides the actual lightness _at the last moment_ based on whether we are in light or dark mode.

## 3. The Operators

Classes in the system are **Operators** that transform the state vector $\Sigma \rightarrow \Sigma'$.

### 3.1. The Container Operator ($K$)

Layout primitives (like `div`, `span`, `section` without a surface class) act as the Identity Operator.

$$
K(\Sigma) = \Sigma
$$

- **Conservation**: Preserves $H, C, L_{src}, \text{and } \alpha$ exactly.
- **Translucency**: A container is mathematically invisible to the state. It allows the parent's "Voice" (Intent) and "Atmosphere" (Context) to pass through unchanged.

> **In Plain English**: A Container is just a grouping mechanism. If you put text inside a `div`, it doesn't stop being "Subtle" or "Brand colored." This formalizes the difference between a **Card** (Surface) and a **Wrapper** (Container).

### 3.2. Surface Operators ($S$)

A Surface establishes a new spatial context. All surfaces act as a **Lossy Barrier** for Intent ($L_{src}$), forcibly resetting the "Voice" to the default. However, they differ in how they handle the "Atmosphere" ($H, C$).

We distinguish between two topological types of surfaces:

#### 3.2.1. Glass Surface ($S_{glass}$)

A Glass Surface (e.g., `surface-card`, `surface-floating`) preserves the ambient environment.

$$
S_{glass}(\langle H, C, L_{src}, \alpha \rangle) = \langle H, C, L_{high}, \alpha' \rangle
$$

- **Context Identity**: $H$ and $C$ are preserved. The surface is tinted by the parent's light.
- **Intent Erasure**: $L_{src}$ is reset to $L_{high}$.
- **Polarity**: $\alpha'$ is resolved (usually $\alpha' = \alpha$, unless inverted).

> **In Plain English**: A standard Card is like a pane of frosted glass. It resets the text conversation (so you can start a new sentence), but it lets the room's colored lighting shine through. If the room is red, the card is tinted red.

#### 3.2.2. Solid Surface ($S_{solid}$)

A Solid Surface (e.g., `surface-neutral`, `surface-paper`) blocks the ambient environment, grounding the local state.

$$
S_{solid}(\langle H, C, L_{src}, \alpha \rangle) = \langle H, 0, L_{high}, \alpha' \rangle
$$

- **Context Reset**: $C$ is forced to $0$ (or a neutral floor $\epsilon$). $H$ becomes irrelevant (undefined) when $C=0$.
- **Intent Erasure**: $L_{src}$ is reset to $L_{high}$.

> **In Plain English**: A Solid Surface is opaque white (or black) paper. It ignores the room's red lighting and creates a purely neutral canvas. This is essential for "breaking out" of a strong brand section to display data or neutral content.

### 3.3. Intent Operator ($I$)

Intent classes (e.g., `.text-subtle`) modify the Lightness Source.

$$
I_{token}(\langle H, C, L_{src}, \alpha \rangle) = \langle H, C, L_{token}, \alpha \rangle
$$

- **Identity on Context**: $H$ and $C$ are preserved.
- **Action**: Updates $L_{src}$.

> **In Plain English**: Intent classes are adjectives. They modify the _current_ noun. They do not change the color of the noun, only its weight or emphasis.

### 3.4. Modifier Operator ($M$)

Modifier classes (e.g., `.hue-brand`) modify the Context variables.

$$
M_{brand}(\langle H, C, L_{src}, \alpha \rangle) = \langle H_{brand}, C_{ambient}, L_{src}, \alpha \rangle
$$

- **Identity on Intent**: $L_{src}$ is preserved.
- **Context Definition**: Updates $H$ to the brand hue and $C$ to the ambient chroma level.

> **In Plain English**: Modifier classes change the lighting of the room. They don't touch the text hierarchy. A title is still a title, but now it's illuminated by purple light.

### A Note on Implementation

This distinction effectively patches the logic hole in your "Reactive Pipeline" draft.

- **Before:** You relied on $M$ (Modifiers) to change color, but had no mechanism to _remove_ color aside from potentially non-semantic overrides.
- **Now:** The $S_{solid}$ operator gives you a semantic way to "ground" a signal.

## 4. Laws of Composition

### 4.1. Orthogonality (Commutativity of $I$ and $M$)

Because Intent ($I$) and Modifiers ($M$) operate on disjoint components of the state vector, they are commutative.

$$ I(M(\Sigma)) \equiv M(I(\Sigma)) $$

**Implication**: The order of classes in HTML (`class="text-subtle hue-brand"` vs `class="hue-brand text-subtle"`) does not matter for the resulting color.

> **In Plain English**: Because `.text-subtle` only touches Lightness, and `.hue-brand` only touches Color, they don't step on each other's toes. You can combine them in any order, and the result is always "Subtle Brand Color".

### 4.2. Surface Dominance

A Surface ($S$) resets the local intent. Therefore, an Intent applied _outside_ a surface does not penetrate _into_ the surface's default text.

$$ \text{Inside Surface: } \Phi(S(I(\Sigma))) \neq \Phi(I(S(\Sigma))) $$

- $S(I(\Sigma))$: The surface resets the intent. The outer intent is lost.
- $I(S(\Sigma))$: The intent is applied _to_ the surface's context.

**Implication**: You must apply text utilities _inside_ or _on_ the element that needs them.

> **In Plain English**: Surfaces are barriers. If you make a container "subtle", and then put a Card inside it, the text inside the Card goes back to normal. The Card protects its contents from the outside world's text styles.

## 5. Invariants

### 5.1. Contrast Preservation

Modifiers ($M$) are **Contrast Preserving**.

$$ \text{Contrast}(\Phi(\Sigma), \text{Background}) \approx \text{Contrast}(\Phi(M(\Sigma)), \text{Background}) $$

Since $M$ only changes $H$ and $C$, and OKLCH is perceptually uniform, the perceived lightness (and thus contrast against the background) remains constant.

> **In Plain English**: Changing the hue (e.g., adding `.hue-brand`) never breaks accessibility. If the text was readable before, it stays readable, because the system only changes the color, not the brightness.

### 5.2. Intent Stability

Intent ($I$) is **Chromatically Transparent**.

$$ \text{Hue}(\Phi(I(\Sigma))) = \text{Hue}(\Phi(\Sigma)) $$

Changing the text importance (High -> Subtle) never shifts the hue.

> **In Plain English**: Changing the text style (e.g., making it `.text-subtle`) never changes its color family. If you are in a "Brand" section, the subtle text will still be tinted with the brand color, just dimmer. The text style doesn't "reset" the color to gray.

## 6. Practical Application

This algebra proves that we can support $N$ intents and $M$ contexts with $N + M$ classes, rather than $N \times M$ classes.

- **Traditional**: `.text-subtle-on-brand`, `.text-subtle-on-neutral`
- **Axiomatic**: `.text-subtle` + `.hue-brand`

The resolution happens at render time via the $\Phi$ function (the CSS Engine).

## 7. Implications & Corollaries

### 7.1. Idempotency of Modifiers

Applying the same modifier twice is equivalent to applying it once.

$$
M_{brand}(M_{brand}(\Sigma)) \equiv M_{brand}(\Sigma)
$$

This means nesting a `.hue-brand` section inside another `.hue-brand` section is safe and redundant.

### 7.2. The "Leakage" Corollary

If a container does _not_ act as a Surface ($S$), it does not reset $L_{src}$.
$$ \text{Container}(I\_{subtle}(\Sigma)) \rightarrow \text{Text is still subtle inside} $$
This distinguishes **Layout Containers** (divs, spans) from **Surfaces** (cards, sidebars). Surfaces are opaque boundaries for Intent; Containers are transparent.

### 7.3. Universal Theming

Since $M$ operators control the environment ($H, C$) for all child elements, changing the top-level modifier effectively re-themes the entire subtree without requiring changes to the leaf nodes (text, borders).

### 7.4. The Portal Effect (Subspace Involution)

Because Inverted Surfaces perform a Hard Flip ($\alpha' = \neg \alpha$), nesting them creates an alternating polarity stack. However, because $S$ is lossy on Intent ($L$), this is not a true inverse of the state.

$$
S_{inv}(S_{inv}(\Sigma)) \neq \Sigma
$$

While the polarity returns to the original ($\neg(\neg \alpha) = \alpha$), the Intent $L_{src}$ is reset to $L_{high}$ at each step. You recover the _mode_, but you lose the _semantic context_.
