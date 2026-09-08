"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/checkout/FormField";

const FEEDBACK_TYPES = ["General Feedback", "Website Experience", "Product Inquiry", "Other"] as const;

type Values = {
  name: string;
  email: string;
  type: (typeof FEEDBACK_TYPES)[number];
  message: string;
};

const EMPTY_VALUES: Values = { name: "", email: "", type: FEEDBACK_TYPES[0], message: "" };

function inputClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-card px-4 py-3 text-base text-cacao placeholder:text-cacao/30 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-gold ${
    hasError ? "border-red-400" : "border-cacao/15"
  }`;
}

/** Same demo-only submission pattern as `ContactForm` — no backend yet, so success is stated honestly. */
export function FeedbackForm() {
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [messageError, setMessageError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "message") setMessageError(undefined);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!values.message.trim()) {
      setMessageError("Please enter your feedback.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-olive/25 bg-olive/10 px-6 py-8">
        <CheckCircle2 className="h-8 w-8 text-olive" strokeWidth={1.5} aria-hidden />
        <div>
          <p className="font-serif text-xl text-cacao">Your feedback has been prepared for this demo.</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            No feedback was actually sent. This form is running in demo mode while a real submission system is
            being connected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Name" htmlFor="feedback-name">
          <input
            id="feedback-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClasses(false)}
          />
        </FormField>

        <FormField label="Email Address" htmlFor="feedback-email">
          <input
            id="feedback-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClasses(false)}
          />
        </FormField>

        <FormField label="Feedback Type" htmlFor="feedback-type" className="sm:col-span-2">
          <select
            id="feedback-type"
            name="type"
            value={values.type}
            onChange={(event) => updateField("type", event.target.value as Values["type"])}
            className={inputClasses(false)}
          >
            {FEEDBACK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Message" htmlFor="feedback-message" required error={messageError} className="sm:col-span-2">
          <textarea
            id="feedback-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(messageError)}
            aria-describedby={messageError ? "feedback-message-error" : undefined}
            className={inputClasses(Boolean(messageError))}
          />
        </FormField>
      </div>

      <p className="text-xs text-muted">
        This is a demo feedback form. Nothing is sent or stored, this only prepares a submission for testing.
      </p>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Prepare Feedback
      </Button>
    </form>
  );
}
