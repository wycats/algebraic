```mdc
# Formal Derivation: Color as a Function of Context and Intent

> **Context**: An algebraic derivation showing how the system's state space supports the high-level intuition `Color = f(Context, Intent)`.

## 1. Proposition

The Axiomatic Color system posits that a resolved color is a pure function of two independent variables: **Context** (the environment) and **Intent** (the semantic role).

$$ \text{Color} = f(\text{Context}, \text{Intent}) $$

This document derives this property from the definitions in [The Algebra of Color Design](./composition-algebra.md).

## 2. State Space Decomposition

Let the system state $\Sigma$ be defined as the **Cartesian Product** of two subspaces: Context ($\Gamma$) and Intent ($\iota$).

$$ \Sigma = \Gamma \times \iota $$

### 2.1. The Subspaces

1.  **Context Space ($\Gamma$)**: The environmental variables.
    $$ \Gamma = \text{Hue} \times \text{Chroma} \times \text{Polarity} $$
    $$ \gamma \in \Gamma = \langle H, C, \alpha \rangle $$

2.  **Intent Space ($\iota$)**: The semantic variables.
    $$ \iota = \text{Tokens} $$
    $$ i \in \iota = \langle L\_{src} \rangle $$

Thus, any state $\sigma \in \Sigma$ is an ordered pair:
$$ \sigma = (\gamma, i) $$

## 3. The Resolution Function ($\Phi$)

The CSS Engine's resolution function $\Phi$ maps the state $\Sigma$ to a color space (OKLCH).

$$ \Phi: (\Gamma \times \iota) \rightarrow \text{Color} $$

$$ \Phi(\langle H, C, \alpha \rangle, \langle L_{src} \rangle) = \text{oklch}(\text{eval}(L_{src}, \alpha), C, H) $$

**Observation**: The function $\Phi$ accepts $\gamma$ and $i$ as distinct arguments. The evaluation of lightness $\text{eval}(L_{src}, \alpha)$ is the only interaction term, representing the "Late Binding" of Intent to Context.

## 4. Derivation of Independence (Orthogonality)

We define the system operators as transformations on $\Sigma$. To prove independence, we must show that Modifiers ($M$) and Intents ($I$) operate on disjoint subspaces.

### 4.1. Operator Definitions

Let $M$ be a modifier function acting on $\Gamma$, and $I$ be an intent function acting on $\iota$.

$$ M(\gamma, i) = (m(\gamma), i) $$
$$ I(\gamma, i) = (\gamma, k(i)) $$

Where $m: \Gamma \rightarrow \Gamma$ and $k: \iota \rightarrow \iota$ are the specific transformations (e.g., "Set Hue to Brand", "Set Token to Subtle").

### 4.2. Commutativity Proof

We examine the composition of these operators in both orders.

**Case 1: Intent then Modifier ($M \circ I$)**
$$ M(I(\gamma, i)) = M(\gamma, k(i)) = (m(\gamma), k(i)) $$

**Case 2: Modifier then Intent ($I \circ M$)**
$$ I(M(\gamma, i)) = I(m(\gamma), i) = (m(\gamma), k(i)) $$

**Result**:
$$ M \circ I \equiv I \circ M $$

**Conclusion**: Since the operators commute, the subspaces $\Gamma$ and $\iota$ are orthogonal. The variables Context and Intent are independent.

## 5. Surface Scoping

The **Surface Operator** ($S$) is a special transformation that acts on both subspaces, enforcing the "Context Flow" and "Intent Reset" rules.

$$ S(\gamma, i) = (\gamma, i\_{reset}) $$

This definition formally encodes the system's scoping rules:

1.  **Inheritance**: The context $\gamma$ is passed through (Identity).
2.  **Isolation**: The intent $i$ is discarded and replaced with $i_{reset}$ (Constant).

## 6. Summary

By modeling the state $\Sigma$ as the product $\Gamma \times \iota$, we have derived that:

1.  **Separability**: The resolution function $\Phi$ is defined over the pair $(\gamma, i)$.
2.  **Independence**: Operations on $\Gamma$ and $\iota$ are commutative.
3.  **Scoping**: Surfaces act as a filter that preserves $\Gamma$ but resets $\iota$.

This confirms that `Color = f(Context, Intent)` is structurally enforced by the algebra.

```
