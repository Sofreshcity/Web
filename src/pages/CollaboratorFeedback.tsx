import { Field, FormShell, TextArea } from "../components/FormBits";
import { useForm } from "../lib/useForm";

function Rating({ name, label }: { name: string; label: string }) {
  return <fieldset><legend className="label mb-3">{label} *</legend>
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {Array.from({length:10},(_,i)=>i+1).map(n=><label key={n} className="cursor-pointer text-center">
        <input type="radio" name={name} value={n} required className="peer sr-only" />
        <span className="flex aspect-square items-center justify-center rounded-full border-2 border-black/20 font-bold peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-yellow-400">{n}</span>
      </label>)}
    </div><p className="mt-2 text-sm opacity-70">1 = lowest · 10 = highest</p></fieldset>;
}
export default function CollaboratorFeedback() {
 const {status,error,onSubmit}=useForm("collaborator_feedback");
 return <div className="section"><div className="container-x max-w-2xl">
  <h1>Collaborator Feedback</h1><p className="mt-4">Thank you for partnering with So Fresh City. Your feedback helps us improve our community events.</p>
  <div className="card mt-8 bg-white"><form onSubmit={onSubmit}><FormShell status={status} error={error} submitLabel="Submit feedback" doneMessage="Thank you! Your feedback has been submitted.">
    <Field label="Organization Name" name="organization_name" required />
    <Field label="Representative Name" name="representative_name" required />
    <Field label="Date of Event" name="event_date" type="date" required />
    <Field label="City" name="city" required />
    <Rating name="event_success" label="How successful was the event?" />
    <fieldset><legend className="label">Would you recommend us to other organizers? *</legend><div className="flex gap-6">{["Yes","No"].map(v=><label key={v} className="flex items-center gap-2"><input type="radio" name="recommend" value={v} required />{v}</label>)}</div></fieldset>
    <Rating name="professionalism" label="Professionalism" />
    <TextArea label="Questions, Comments, or Concerns" name="comments" rows={6} />
  </FormShell></form></div></div></div>;
}
