import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Like Motion's `useReducedMotion`, but hydration-safe.
 *
 * Motion's own hook reads `matchMedia` synchronously on first render, so a
 * client whose OS has reduced-motion enabled resolves `true` on its very
 * first (hydration) render while the server — which has no `window` —
 * always resolves `false`. Any `initial`/`animate` values gated on that
 * value then mismatch between server-rendered and hydrated markup.
 *
 * `useSyncExternalStore` is the React-blessed fix for exactly this class of
 * problem: it renders `getServerSnapshot()` during hydration (matching the
 * server) and corrects to the real `getSnapshot()` value immediately after,
 * without ever producing a server/client markup mismatch.
 */
export function useSafeReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
