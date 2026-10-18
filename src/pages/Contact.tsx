import { Field, FormShell, TextArea } from "../components/FormBits";
import { CONTACT_EMAIL } from "../lib/config";
import { useForm } from "../lib/useForm";

export default function Contact() {
  const { status, error, onSubmit } = useForm("contact");

  return (
    <div className="section">
      <div className="container-x max-w-2xl">
        <h1>Contact</h1>
        <p className="mt-4 text-lg">Questions, partnerships, or press? Send us a note.</p>
        {CONTACT_EMAIL && (
          <p className="mt-2">
            Or email{" "}
            <a className="font-bold underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
        <div className="card mt-8 bg-white">
          <form onSubmit={onSubmit}>
            <FormShell status={status} error={error} submitLabel="Send message" doneMessage="Message sent. Thank you!">
              <Field label="Name" name="full_name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Subject" name="subject" />
              <TextArea label="Message" name="message" required rows={6} />
            </FormShell>
          </form>
        </div>
      </div>
    </div>
  );
}
