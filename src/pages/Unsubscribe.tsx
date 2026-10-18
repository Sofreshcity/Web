import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SUPABASE_URL } from "../lib/supabase";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<"idle" | "working" | "done" | "error">("idle");

  useEffect(() => {
    document.title = "Unsubscribe | So Fresh City";
  }, []);

  async function confirm() {
    setState("working");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "unsubscribe", token }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="section">
      <div className="container-x max-w-xl">
        <h1>Unsubscribe</h1>
        {!token && <p className="mt-4">This unsubscribe link is missing its token. Please use the link in your email.</p>}
        {token && state !== "done" && (
          <>
            <p className="mt-4 text-lg">Confirm that you want to stop receiving So Fresh City emails.</p>
            <button className="btn btn-primary mt-6" onClick={confirm} disabled={state === "working"}>
              {state === "working" ? "Working…" : "Unsubscribe me"}
            </button>
            {state === "error" && (
              <p role="alert" className="mt-4 font-semibold text-red-700">
                That didn't work. The link may be invalid. Please contact us and we'll remove you.
              </p>
            )}
          </>
        )}
        {state === "done" && (
          <p role="status" className="mt-4 text-lg font-semibold">
            You've been unsubscribed.
          </p>
        )}
        <Link to="/" className="btn btn-soft mt-8">
          Back home
        </Link>
      </div>
    </div>
  );
}
