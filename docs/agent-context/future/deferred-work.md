# Deferred Work

## Epoch 3: Polish & Persistence

### Phase 4: Framework Integration

**Original Goal:** Create `useColorSystem` hooks for React and Vue.

**Reason for Deferral:**
- The core library does not currently depend on React or Vue.
- Adding these dependencies (even as peers) complicates the build and testing setup.
- The implementation is trivial (`useMemo(() => solve(config), [config])`) and can be easily implemented by consumers.
- We implemented `useSolvedTheme` in the demo app as a reference implementation.

**Future Plan:**
- Consider creating separate packages (e.g., `@color-system/react`, `@color-system/vue`) in a future epoch if demand exists.
