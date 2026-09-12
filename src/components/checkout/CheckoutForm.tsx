"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PROVINCES, type CheckoutFormErrors, type CheckoutFormValues } from "@/lib/checkout-types";
import { validateCheckoutForm } from "@/lib/checkout-validation";
import { FormField } from "./FormField";

const EMPTY_VALUES: CheckoutFormValues = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  province: "",
  postalCode: "",
};

/** Order the fields appear in — used to focus the first invalid field after a failed submit. */
const FIELD_ORDER: (keyof CheckoutFormValues)[] = [
  "fullName",
  "phone",
  "email",
  "addressLine1",
  "addressLine2",
  "city",
  "province",
  "postalCode",
];

function inputClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-card px-4 py-3 text-base text-cacao placeholder:text-cacao/30 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-gold ${
    hasError ? "border-red-400" : "border-cacao/15"
  }`;
}

export function CheckoutForm({ onValidSubmit }: { onValidSubmit: (values: CheckoutFormValues) => void }) {
  const [values, setValues] = useState<CheckoutFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  // A ref guard (not just state) because two rapid clicks can both read the
  // same pre-update `submitting` state before React re-renders — the ref is
  // checked and set synchronously, so the second click sees it immediately.
  const submittingRef = useRef(false);

  function updateField<K extends keyof CheckoutFormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submittingRef.current) return;

    const validationErrors = validateCheckoutForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = FIELD_ORDER.find((key) => validationErrors[key]);
      if (firstErrorField) document.getElementById(firstErrorField)?.focus();
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    onValidSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-9">
      <section>
        <h2 className="font-display font-medium text-2xl text-cacao">Customer Details</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName} className="sm:col-span-2">
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              value={values.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={inputClasses(Boolean(errors.fullName))}
            />
          </FormField>

          <FormField label="Phone Number" htmlFor="phone" required error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="03XXXXXXXXX"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClasses(Boolean(errors.phone))}
            />
          </FormField>

          <FormField label="Email Address" htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClasses(Boolean(errors.email))}
            />
          </FormField>
        </div>
      </section>

      <section className="border-t border-cacao/10 pt-9">
        <h2 className="font-display font-medium text-2xl text-cacao">Delivery Address</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Address Line 1"
            htmlFor="addressLine1"
            required
            error={errors.addressLine1}
            className="sm:col-span-2"
          >
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              required
              autoComplete="address-line1"
              value={values.addressLine1}
              onChange={(event) => updateField("addressLine1", event.target.value)}
              aria-invalid={Boolean(errors.addressLine1)}
              aria-describedby={errors.addressLine1 ? "addressLine1-error" : undefined}
              className={inputClasses(Boolean(errors.addressLine1))}
            />
          </FormField>

          <FormField label="Address Line 2" htmlFor="addressLine2" className="sm:col-span-2">
            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              autoComplete="address-line2"
              value={values.addressLine2}
              onChange={(event) => updateField("addressLine2", event.target.value)}
              className={inputClasses(false)}
            />
          </FormField>

          <FormField label="City" htmlFor="city" required error={errors.city}>
            <input
              id="city"
              name="city"
              type="text"
              required
              autoComplete="address-level2"
              value={values.city}
              onChange={(event) => updateField("city", event.target.value)}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "city-error" : undefined}
              className={inputClasses(Boolean(errors.city))}
            />
          </FormField>

          <FormField label="Province" htmlFor="province" required error={errors.province}>
            <select
              id="province"
              name="province"
              required
              autoComplete="address-level1"
              value={values.province}
              onChange={(event) => updateField("province", event.target.value)}
              aria-invalid={Boolean(errors.province)}
              aria-describedby={errors.province ? "province-error" : undefined}
              className={inputClasses(Boolean(errors.province))}
            >
              <option value="">Select province</option>
              {PROVINCES.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Postal Code" htmlFor="postalCode" error={errors.postalCode}>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={values.postalCode}
              onChange={(event) => updateField("postalCode", event.target.value)}
              className={inputClasses(false)}
            />
          </FormField>
        </div>
      </section>

      <section className="border-t border-cacao/10 pt-9">
        <h2 className="font-display font-medium text-2xl text-cacao">Payment Method</h2>
        <div className="mt-5 rounded-xl border border-cacao/15 bg-card px-4 py-3.5">
          <p className="font-medium text-cacao">Cash on Delivery</p>
          <p className="mt-1 text-sm text-muted">Pay when your order arrives.</p>
        </div>
        <p className="mt-2 text-xs text-muted">Demo checkout: Cash on Delivery is the only option available.</p>
      </section>

      <div className="border-t border-cacao/10 pt-9">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Placing Demo Order…" : "Place Demo Order"}
        </Button>
      </div>
    </form>
  );
}
