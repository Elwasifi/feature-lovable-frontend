/** Stub auth hook — the account system is not connected to any backend yet. */
export function useAuth() {
  return {
    session: null,
    user: null,
    loading: false,
    signOut: async () => {},
  };
}
