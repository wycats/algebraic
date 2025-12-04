# The Algebra of Composition

> **Status**: Draft
> **Context**: Formal definition of the Reactive Pipeline's composition logic.

This document formalizes the composition structure of the Axiomatic Color system using algebraic notation. It defines the state space, the operators that transform that state, and the invariants that guarantee the system's correctness.

## 1. The State Space ($\Sigma$)

<p>Σ</p>

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

## 2. The Resolution Function ($\Phi$)

The CSS Engine acts as a projection function $\Phi$ that maps the state vector $\Sigma$ to a concrete CSS color value.

$$ \Phi(\Sigma) \mapsto \text{ColorSpace}(\text{oklch}) $$

$$ \Phi(\langle H, C, L*{src}, \alpha \rangle) = \text{oklch}(\text{eval}(L*{src}, \alpha), C, H) $$

Where $\text{eval}(L_{src}, \alpha)$ represents the **Late Binding** of the token. It is a lookup function into the token definition set:
$$ \forall t \in \text{Tokens}, \exists (l*{light}, l*{dark}) \text{ s.t. } \text{eval}(t, \alpha) = (\alpha = \text{Dark}) ? l*{dark} : l*{light} $$

> **In Plain English**: $\Phi$ is the browser's rendering engine. It takes the DNA ($\Sigma$) and turns it into actual pixels. Crucially, it decides the actual lightness _at the last moment_ based on whether we are in light or dark mode.

## 3. The Operators

Classes in the system are **Operators** that transform the state vector $\Sigma \rightarrow \Sigma'$.

### 3.1. Surface Operator ($S$)

A Surface establishes a new context. It acts as an **Identity** for Context ($H, C$) but a **Lossy Barrier** for Intent ($L_{src}$).

$$ S*{type}(\langle H, C, L*{src}, \alpha \rangle) = \langle H, C, L\_{high}, \alpha' \rangle $$

- **Context Stability**: $H$ and $C$ are preserved (Identity). The surface inherits the ambient atmosphere of its parent.
- **Intent Erasure**: $L_{src}$ is forcibly reset to $L_{high}$. This operation is **Non-Invertible** (you cannot "undo" a surface to recover the parent's text style).
- **Polarity**: $\alpha$ is transformed. For standard surfaces, $\alpha' = \alpha$. For inverted surfaces, $\alpha' = \neg \alpha$ (Hard Flip).

> **In Plain English**: A Surface is like a glass box. It lets the "mood lighting" (Hue/Chroma) shine through from the outside, but it resets the "conversation" (Text). Inside the box, you start a new sentence with standard text color, even if the text outside was faint or bold.

> **Rationalization: Ambient vs. Semantic State**
>
> We can rationalize this behavior by distinguishing between two types of state:
>
> 1.  **Environmental State ($H, C$)**: This behaves like **Ambient Light**. If a room is lit with red light, objects inside (Surfaces) should reflect that red tint. The atmosphere permeates boundaries.
> 2.  **Semantic State ($L_{src}$)**: This behaves like **Grammar**. A "Card" is a new sentence. Just because the previous sentence ended quietly (Subtle) doesn't mean the new sentence (Card Title) should start quietly. The grammar resets at the boundary of the object.

### 3.2. Intent Operator ($I$)

Intent classes (e.g., `.text-subtle`) modify the Lightness Source.

$$ I*{token}(\langle H, C, L*{src}, \alpha \rangle) = \langle H, C, L\_{token}, \alpha \rangle $$

- **Identity on Context**: $H$ and $C$ are preserved.
- **Action**: Updates $L_{src}$.

> **In Plain English**: Intent classes like `.text-subtle` only change _one_ thing: the lightness reference. They don't touch the color. They say "make this text dimmer," regardless of whether it's blue, red, or purple.

### 3.3. Modifier Operator ($M$)

Modifier classes (e.g., `.hue-brand`) modify the Context variables.

$$ M*{brand}(\langle H, C, L*{src}, \alpha \rangle) = \langle H*{brand}, C*{ambient}, L\_{src}, \alpha \rangle $$

- **Identity on Intent**: $L_{src}$ is preserved.
- **Context Definition**: Updates $H$ to the brand hue. Updates $C$ to the **Ambient Chroma** ($C_{ambient} \approx 0.1 \times C_{brand}$).

> **In Plain English**: Modifier classes like `.hue-brand` change the atmosphere. They say "everything inside here should be purple," but they don't touch the text hierarchy. A title is still a title, just purple now. This is also where the "Dampening" happens: the modifier takes a vibrant brand color and creates a soft ambient version for backgrounds.

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
$$ M*{brand}(M*{brand}(\Sigma)) \equiv M\_{brand}(\Sigma) $$
This means nesting a `.hue-brand` section inside another `.hue-brand` section is safe and redundant.

### 7.2. The "Leakage" Corollary

If a container does _not_ act as a Surface ($S$), it does not reset $L_{src}$.
$$ \text{Container}(I\_{subtle}(\Sigma)) \rightarrow \text{Text is still subtle inside} $$
This distinguishes **Layout Containers** (divs, spans) from **Surfaces** (cards, sidebars). Surfaces are opaque boundaries for Intent; Containers are transparent.

### 7.3. Universal Theming

Since $M$ operators control the environment ($H, C$) for all child elements, changing the top-level modifier effectively re-themes the entire subtree without requiring changes to the leaf nodes (text, borders).

### 7.4. The Portal Effect (Subspace Involution)

Because Inverted Surfaces perform a Hard Flip ($\alpha' = \neg \alpha$), nesting them creates an alternating polarity stack. However, because $S$ is lossy on Intent ($L$), this is not a true inverse of the state.

$$ S*{inv}(S*{inv}(\Sigma)) \neq \Sigma $$

While the polarity returns to the original ($\neg(\neg \alpha) = \alpha$), the Intent $L_{src}$ is reset to $L_{high}$ at each step. You recover the _mode_, but you lose the _semantic context_.
