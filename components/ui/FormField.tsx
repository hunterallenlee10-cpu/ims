import { cn } from "@/lib/cn";

const control =
  "w-full rounded-site-sm border border-line bg-surface px-4 py-3 text-heading placeholder:text-muted/70 transition-colors focus:border-accent-light focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light aria-[invalid=true]:border-[#ff7a90]";

type Props = {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email";
  multiline?: boolean;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  hint?: string;
  defaultValue?: string;
};

/** Labeled input/textarea with a visible label and inline error text. */
export function FormField({ id, label, name, type = "text", multiline, required, autoComplete, error, hint, defaultValue }: Props) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-heading">
        {label}
        {required ? <span className="text-accent-light"> *</span> : <span className="text-muted"> (optional)</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={6}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(control, "min-h-40 resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(control, "min-h-12")}
        />
      )}
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#ff9aab]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
