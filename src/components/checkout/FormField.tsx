import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Shared label + input slot + accessible error message, used by every checkout field. */
export function FormField({ label, htmlFor, required, error, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-cacao">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-cacao/50">
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
