import { ReactNode } from "react";

export function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className="input" />
    </div>
  );
}

export function TextArea({ label, name, required, rows = 4 }: { label: string; name: string; required?: boolean; rows?: number }) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      <textarea id={name} name={name} required={required} rows={rows} className="input" />
    </div>
  );
}

export function Select({ label, name, options, required }: { label: string; name: string; options: readonly string[]; required?: boolean }) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      <select id={name} name={name} required={required} className="input" defaultValue="">
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Hidden field; real people never see or fill it, bots do. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormShell({ status, error, children, submitLabel, doneMessage }: { status: string; error: string; children: ReactNode; submitLabel: string; doneMessage: string }) {
  return (
    <>
      <div className="relative space-y-4">
        <Honeypot />
        {children}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        {status === "done" && (
          <p role="status" className="font-semibold">
            {doneMessage}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="font-semibold text-red-700">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
