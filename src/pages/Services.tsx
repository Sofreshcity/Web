import { Field, FormShell, Select, TextArea } from "../components/FormBits";
import { CITIES } from "../lib/config";
import { useForm } from "../lib/useForm";

const services = [
  { title: "Free haircuts", body: "Cuts from volunteer barbers and stylists at our events.", color: "bg-lavender" },
  { title: "Hygiene services", body: "Hygiene supplies and care to help you feel your best.", color: "bg-mint" },
  { title: "Social advocacy", body: "Help connecting with local resources and employment readiness support.", color: "bg-peach" },
];

export default function Services() {
  const { status, error, onSubmit } = useForm("service", (fd) => ({
    ...Object.fromEntries(fd),
    consent_to_contact: fd.get("consent_to_contact") === "on",
  }));

  return (
    <div className="section">
      <div className="container-x">
        <h1>Services</h1>
        <p className="mt-4 max-w-2xl text-lg">All of our services are free.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className={`card ${s.color}`}>
              <h3>{s.title}</h3>
              <p className="mt-2">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="card mt-12 max-w-2xl bg-white">
          <h2 className="text-2xl sm:text-3xl">Request a service</h2>
          <p className="mt-2 text-sm">Leave a phone number or email so we can reach you with the next event or appointment.</p>
          <form onSubmit={onSubmit} className="mt-6">
            <FormShell status={status} error={error} submitLabel="Send request" doneMessage="Thanks! We'll be in touch soon.">
              <Field label="Name" name="full_name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Email" name="email" type="email" />
              </div>
              <Select label="What do you need?" name="service" required options={["haircut", "hygiene", "advocacy", "other"]} />
              <Select label="City" name="preferred_city" options={CITIES} />
              <TextArea label="Anything else we should know?" name="message" />
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" name="consent_to_contact" className="mt-1 h-4 w-4" />I agree to be contacted about my request.
              </label>
            </FormShell>
          </form>
        </div>
      </div>
    </div>
  );
}
