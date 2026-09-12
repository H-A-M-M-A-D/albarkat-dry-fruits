"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/checkout/FormField";

type Values = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY_VALUES: Values = { name: "", email: "", phone: "", subject: "", message: "" };

function inputClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-card px-4 py-3 text-base text-cacao placeholder:text-cacao/30 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-gold ${
    hasError ? "border-red-400" : "border-cacao/15"
  }`;
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

/**
 * No backend exists yet, so a valid submit shows an explicitly honest
 * "prepared for this demo" state rather than claiming the message was sent
 * or received. Architecture (isolated `handleSubmit`, plain `values` object)
 * is ready for a real API call to replace the local-only branch later.
 */
export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof Values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-olive/25 bg-olive/10 px-6 py-8">
        <CheckCircle2 className="h-8 w-8 text-olive" strokeWidth={1.5} aria-hidden />
        <div>
          <p className="font-display text-xl text-cacao">Your message has been prepared for this demo.</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            No message was actually sent. This form is running in demo mode while a real inquiry system is
            being connected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Name" htmlFor="contact-name" required error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClasses(Boolean(errors.name))}
          />
        </FormField>

        <FormField label="Email Address" htmlFor="contact-email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClasses(false)}
          />
        </FormField>

        <FormField label="Phone Number" htmlFor="contact-phone" error={errors.phone} className="sm:col-span-2">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={inputClasses(false)}
          />
        </FormField>

        <FormField label="Subject" htmlFor="contact-subject" required error={errors.subject} className="sm:col-span-2">
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            className={inputClasses(Boolean(errors.subject))}
          />
        </FormField>

        <FormField label="Message" htmlFor="contact-message" required error={errors.message} className="sm:col-span-2">
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={inputClasses(Boolean(errors.message))}
          />
        </FormField>
      </div>

      <p className="text-xs text-muted">
        This is a demo inquiry form. No message is sent or stored, this only prepares a submission for testing.
      </p>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Prepare Inquiry
      </Button>
    </form>
  );
}
