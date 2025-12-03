# The Algebra of Composition

> **Status**: Draft
> **Context**: Formal definition of the Reactive Pipeline's composition logic.

This document formalizes the composition structure of the Axiomatic Color system using algebraic notation. It defines the state space, the operators that transform that state, and the invariants that guarantee the system's correctness.

## 1. The State Space ($\Sigma$)

The system state at any point in the DOM tree is defined by a vector $\Sigma$.

$$ \Sigma = \langle H, C, L\_{src}, \alpha \rangle $$

Where:

- $H \in [0, 360)$: **Context Hue**. The base hue for the current environment.
- $C \in [0, 1]$: **Context Chroma**. The base vibrancy for the current environment.
- $L_{src} \in \text{Token}$: **Intent Lightness**. A reference to a lightness token (e.g., `text-high`, `text-subtle`).
- $\alpha \in \{ \text{Page}, \text{Inverted} \}$: **Polarity**. The current background polarity (Light/Dark mode context).

> **In Plain English**: Think of $\Sigma$ as the "DNA" of the current element. It carries four genes: what color family we are in ($H$), how vibrant it is ($C$), how bright the text should be ($L_{src}$), and whether we are in light or dark mode ($\alpha$). Every element inherits this DNA from its parent.

## 2. The Resolution Function ($\Phi$)

The CSS Engine acts as a projection function $\Phi$ that maps the state vector $\Sigma$ to a concrete CSS color value.

$$ \Phi(\Sigma) = \text{oklch}(\text{from } L\_{src} \text{ l } C \ H) $$

_Note: The actual implementation involves CSS variable indirection, but this is the logical model._

> **In Plain English**: $\Phi$ is the browser's rendering engine. It takes the DNA ($\Sigma$) and turns it into actual pixels on the screen. It mixes the lightness from the token with the hue and chroma from the context.

## 3. The Operators

Classes in the system are **Operators** that transform the state vector $\Sigma \rightarrow \Sigma'$.

### 3.1. Surface Operator ($S$)

A Surface establishes a new context. It is a "Reset" operator for Intent, but a "Inherit/Modify" operator for Context.

$$ S*{type}(\langle H, C, L*{src}, \alpha \rangle) = \langle H', C', L\_{default}, \alpha' \rangle $$

- **Input**: Inherits $H$ and $C$ (unless overridden by specific surface types like `surface-tinted`).
- **Output**:
  - Resets $L_{src}$ to $L_{high}$ (The default text intent).
  - **Polarity Flip**: Surfaces like `surface-spotlight` explicitly redefine the mapping of $L_{src}$ tokens. For example, in Light Mode, a spotlight surface forces $L_{high}$ to be white (inverted), effectively flipping $\alpha$ locally without changing the global `color-scheme`.

> **In Plain English**: A Surface is a "clean slate". When you enter a card or a sidebar, it might keep the color theme ($H, C$), but it forgets any text styles from the outside ($L_{src}$ resets to default). It also decides if we are flipping to dark mode.

### 3.2. Intent Operator ($I$)

Intent classes (e.g., `.text-subtle`) modify the Lightness Source.

$$ I*{token}(\langle H, C, L*{src}, \alpha \rangle) = \langle H, C, L\_{token}, \alpha \rangle $$

- **Identity on Context**: $H$ and $C$ are preserved.
- **Action**: Updates $L_{src}$.

> **In Plain English**: Intent classes like `.text-subtle` only change _one_ thing: the lightness reference. They don't touch the color. They say "make this text dimmer," regardless of whether it's blue, red, or purple.

### 3.3. Modifier Operator ($M$)

Modifier classes (e.g., `.hue-brand`) modify the Context variables.

$$ M*{brand}(\langle H, C, L*{src}, \alpha \rangle) = \langle H*{brand}, C*{brand}, L\_{src}, \alpha \rangle $$

- **Identity on Intent**: $L_{src}$ is preserved.
- **Action**: Updates $H$ and $C$.

> **In Plain English**: Modifier classes like `.hue-brand` change the atmosphere. They say "everything inside here should be purple," but they don't touch the text hierarchy. A title is still a title, just purple now.

## 4. Laws of Composition

### 4.1. Orthogonality (Commutativity of $I$ and $M$)

> **In Plain English**: Because `.text-subtle` only touches Lightness, and `.hue-brand` only touches Color, they don't step on each other's toes. You can combine them in any order, and the result is always "Subtle Brand Color".

### 4.2. Surface Dominance

A Surface ($S$) resets the local intent. Therefore, an Intent applied _outside_ a surface does not penetrate _into_ the surface's default text.

$$ \text{Inside Surface: } \Phi(S(I(\Sigma))) \neq \Phi(I(S(\Sigma))) $$

- $S(I(\Sigma))$: The surface resets the intent. The outer intent is lost.
- $I(S(\Sigma))$: The intent is applied _to_ the surface's context.

**Implication**: You must apply text utilities _inside_ or _on_ the element that needs them.

> **In Plain English**: Surfaces are barriers. If you make a container "subtle", and then put a Card inside it, the text inside the Card goes back to normal. The Card protects its contents from the outside world's text styles
> $$ \text{Inside Surface: } \Phi(S(I(\Sigma))) \neq \Phi(I(S(\Sigma))) $$

- $S(I(\Sigma))$: The surface resets the intent. The outer intent is lost.
- $I(S(\Sigma))$: The intent is applied _to_ the surface's context.

**Implication**: You must apply text utilities _inside_ or _on_ the element that needs them.

## 5. Invariants

### 5.1. Contrast Preservation

Modifiers ($M$) are **Contrast Preserving**.

$$ \text{Contrast}(\Phi(\Sigma), \text{Background}) \approx \text{Contrast}(\Phi(M(\Sigma)), \text{Background}) $$

Since $M$ only changes $H$ and $C$, and OKLCH is perceptually uniform, the perceived lightness (and thus contrast against the background) remains constant.

### 5.2. Intent Stability

Intent ($I$) is **Chromatically Transparent**.

$$ \text{Hue}(\Phi(I(\Sigma))) = \text{Hue}(\Phi(\Sigma)) $$

Changing the text importance (High -> Subtle) never shifts the hue.

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
