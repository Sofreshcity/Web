import { Field, FormShell, Select, TextArea } from "../components/FormBits";
import { CITIES, VOLUNTEER_INTERESTS } from "../lib/config";
import { useForm } from "../lib/useForm";

export default function GetInvolved() {
  const { status, error, onSubmit } = useForm("volunteer", (fd) => ({
    ...Object.fromEntries(fd),
    interests: fd.getAll("interests"),
  }));

  return (
    <div className="section">
      <div className="container-x max-w-2xl">
        <h1>Get involved</h1>
        <p className="mt-4 text-lg">Barbers, stylists, organizers, and everyday helpers all make our events possible. Tell us a bit about yourself.</p>
        <div className="card mt-8 bg-white">
          <form onSubmit={onSubmit}>
            <FormShell status={status} error={error} submitLabel="Sign up to volunteer" doneMessage="Thank you! Check your email for a confirmation.">
              <Field label="Full name" name="full_name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <Select label="City" name="city" options={CITIES} />
              <fieldset>
                <legend className="label">I'm interested in</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {VOLUNTEER_INTERESTS.map((i) => (
                    <label key={i} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="interests" value={i} className="h-4 w-4" />
                      {i}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field label="Availability" name="availability" placeholder="e.g. weekends, one Saturday a month" />
              <TextArea label="Anything else?" name="message" />
            </FormShell>
          </form>
        </div>
      </div>
    </div>
  );
}
