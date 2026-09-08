import { useMemo, useSyncExternalStore } from "react";
import { parseDemoOrder, STORAGE_KEY } from "./demo-order";
import type { DemoOrder } from "./checkout-types";

function subscribe() {
  // Nothing to subscribe to: this store is read once per mount and isn't
  // expected to change while the confirmation page is open (same-tab writes
  // to sessionStorage don't fire a native event anyway).
  return () => {};
}

function getSnapshot(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

/**
 * Hydration-safe read of the last demo order — same pattern as
 * `useSafeReducedMotion`: the server (and the client's matching hydration
 * render) sees `null`, then `useSyncExternalStore` corrects to the real
 * value immediately after, with no server/client markup mismatch and no
 * `setState`-in-an-effect.
 *
 * `getSnapshot` returns the raw stored *string*, not a parsed `DemoOrder` —
 * `useSyncExternalStore` compares snapshots with `Object.is` on every
 * render, and a freshly `JSON.parse`d object is a new reference every call
 * even when its content hasn't changed, which would make it look like the
 * store is "always changing." A string compares by value, so it's stable;
 * parsing into a `DemoOrder` happens separately, memoized on that string.
 */
export function useDemoOrder(): DemoOrder | null {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => (raw ? parseDemoOrder(raw) : null), [raw]);
}
