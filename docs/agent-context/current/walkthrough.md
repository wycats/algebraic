# Phase Walkthrough: Dev Environment Simplification

## Goal
Simplify the local development environment to match the production deployment structure (GitHub Pages) without using fragile custom scripts.

## Changes

### 1. Removed Custom Proxy Script
- Deleted `scripts/dev-site.ts`. This script was attempting to manually proxy requests to `mdbook` and `vite`, but was causing `EADDRINUSE` errors and zombie processes.

### 2. Configured Vite Proxy
- Updated `demo/vite.config.ts` to use Vite's built-in proxy capabilities.
- Vite now runs on port 3000 and proxies any request that is *not* for the demo app to the `mdbook` server running on port 3001.
- This creates a unified local server at `http://localhost:3000` that mirrors the production structure:
  - `/` -> Documentation (proxied to mdbook)
  - `/demo/` -> Demo App (served by Vite)

### 3. Updated Scripts
- Updated `package.json` scripts:
  - `docs:dev`: Runs `mdbook serve` on port 3001 (after updating docs).
  - `dev:site`: Runs both `docs:dev` and the demo's `dev` script concurrently.

## Verification
- Run `pnpm dev:site`.
- Visit `http://localhost:3000/` to see the docs.
- Visit `http://localhost:3000/demo/` to see the demo.
- No more `EADDRINUSE` errors.
