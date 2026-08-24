type StubUser = { id: string; email?: string | null };

/** Stub auth hook — the account system is not connected to any backend yet. */
export function useAuth(): {
  session: null;
  user: StubUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
} {
  return {
    session: null,
    user: null,
    loading: false,
    signOut: async () => {},
  };
}
