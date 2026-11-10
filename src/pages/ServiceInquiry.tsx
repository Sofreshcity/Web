import { Field, FormShell, Select, TextArea } from "../components/FormBits";
import { useForm } from "../lib/useForm";

export default function ServiceInquiry() {
  const { status, error, onSubmit } = useForm("service");
  return (
    <div className="section">
      <div className="container-x max-w-2xl">
        <h1>Inquire about service</h1>
        <p className="mt-4 text-lg">Planning a community event in the Bay Area? Tell us about your event and the haircut or styling services you are looking for. Our team will review your inquiry and follow up.</p>
        <div className="card mt-8 bg-white">
          <form onSubmit={onSubmit}>
            <FormShell status={status} error={error} submitLabel="Submit inquiry" doneMessage="Thank you! Your service inquiry has been submitted.">
              <Field label="Organization or group name" name="organization_name" required />
              <Field label="Contact name" name="full_name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <Field label="Event name" name="event_name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Proposed event date" name="event_date" type="date" />
                <Field label="City / location" name="city" required />
              </div>
              <Select label="Services requested" name="service_type" required options={["Haircuts", "Hair styling", "Haircuts and styling", "Other / unsure"]} />
              <Field label="Estimated number of participants" name="estimated_attendees" type="number" />
              <TextArea label="Event details and service needs" name="message" required rows={5} />
            </FormShell>
          </form>
        </div>
      </div>
    </div>
  );
}
