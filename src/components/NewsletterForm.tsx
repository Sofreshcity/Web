import { Honeypot } from "./FormBits";
import { useForm } from "../lib/useForm";

export default function NewsletterForm({ source = "website", dark = false }: { source?: string; dark?: boolean }) {
  const { status, error, onSubmit } = useForm("newsletter", (fd) => ({ email: fd.get("email"), website: fd.get("website"), source }));
  const id = `newsletter-email-${source}`;

  return (
    <form onSubmit={onSubmit} className="relative">
      <Honeypot />
      <label htmlFor={id} className="label">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input id={id} name="email" type="email" required placeholder="you@example.com" className={`input ${dark ? "text-ink" : ""}`} autoComplete="email" />
        <button type="submit" disabled={status === "sending"} className={`btn ${dark ? "border-paper bg-paper text-ink" : "btn-primary"} shrink-0`}>
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "done" && (
        <p role="status" className="mt-3 font-semibold">
          You're on the list. Thank you!
        </p>
      )}
      {status === "error" && (
        <p role="alert" className={`mt-3 font-semibold ${dark ? "text-rose" : "text-red-700"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
