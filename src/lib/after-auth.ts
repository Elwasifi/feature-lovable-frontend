/**
 * Remembers where the visitor was when we asked them to sign in, so /auth can
 * send them straight back to finish what they started (e.g. "Add to trip").
 */
const KEY = "egyptora:after-auth";

export function rememberAfterAuth(path: string) {
  try {
    window.sessionStorage.setItem(KEY, path);
  } catch {
    /* storage unavailable — fall back to the default destination */
  }
}

/** Returns the saved path once, then clears it. */
export function consumeAfterAuth(): string | null {
  try {
    const value = window.sessionStorage.getItem(KEY);
    if (value) window.sessionStorage.removeItem(KEY);
    return value && value.startsWith("/") ? value : null;
  } catch {
    return null;
  }
}
