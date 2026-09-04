import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Real Supabase Auth session hook. Reads the current session on mount, then
 * stays in sync via `onAuthStateChange` (sign in, sign out, token refresh,
 * and — on a Lovable preview — the brokered cross-frame session).
 */
export function useAuth(): {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
} {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error("[use-auth] failed to read session:", error.message);
        }
        setSession(data.session ?? null);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error("[use-auth] unexpected error reading session:", err);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user ?? null,
    loading,
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.error("[use-auth] sign out failed:", error.message);
    },
  };
}
