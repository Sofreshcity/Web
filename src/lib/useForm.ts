import { FormEvent, useState } from "react";
import { SUPABASE_URL } from "./supabase";

type Kind = "volunteer" | "service" | "contact";
type Status = "idle" | "sending" | "done" | "error";

export function useForm(kind: Kind, collect: (fd: FormData) => Record<string, unknown> = (fd) => Object.fromEntries(fd)) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...collect(new FormData(form)) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return { status, error, onSubmit };
}
