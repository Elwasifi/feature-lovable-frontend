import { createServerFn } from "@tanstack/react-start";

export type ContactResult = { ok: boolean; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ContactInput = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

/**
 * Public contact form endpoint. Writes are server-side only: the table has no
 * read access and no anon grants, so nothing about these messages is exposed.
 */
export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: ContactInput) => input)
  .handler(async ({ data }): Promise<ContactResult> => {
    const name = (data.name ?? "").trim().slice(0, 120);
    const email = (data.email ?? "").trim().slice(0, 255);
    const topic = (data.topic ?? "").trim().slice(0, 160);
    const message = (data.message ?? "").trim().slice(0, 4000);

    if (!name) return { ok: false, error: "Please enter your name." };
    if (!email || !EMAIL_RE.test(email))
      return { ok: false, error: "Please enter a valid email address." };
    if (!message) return { ok: false, error: "Please write a message." };

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin
        .from("contact_messages")
        .insert({ name, email, topic: topic || null, message });
      if (error) throw error;
      return { ok: true };
    } catch (err) {
      console.error("[contact] failed to save message:", err);
      return { ok: false, error: "We couldn't send your message. Please try again." };
    }
  });
