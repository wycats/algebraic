#!/bin/bash
# Check for usage of Starlight tokens in the Builder V2 directory

if grep -r "var(--sl-" site/src/components/builder-v2; then
  echo "Error: Starlight tokens (var(--sl-...)) found in Builder V2 components."
  echo "Please use Axiomatic tokens (var(--...-token)) instead."
  exit 1
else
  echo "Token check passed."
  exit 0
fi
