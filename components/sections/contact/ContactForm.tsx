"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "success" | "error";

function validate(data: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (data.message.trim().length < 10) errors.message = "Please write at least a sentence.";
  return errors;
}

export function ContactForm() {
  const f = contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""), // honeypot
    };
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-site border border-accent-light/70 bg-surface p-8">
        <p className="eyebrow text-accent-light">Message sent</p>
        <p className="mt-3 text-body">{f.success}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby={status === "error" ? "form-error" : undefined}>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="name" name="name" label={f.name} required autoComplete="name" error={errors.name} />
        <FormField id="email" name="email" type="email" label={f.email} required autoComplete="email" error={errors.email} />
      </div>
      <FormField id="message" name="message" label={f.message} multiline required hint={f.messageHint} error={errors.message} />
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" ? (
        <p id="form-error" role="alert" className="text-sm text-[#ff9aab]">
          {f.error}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto sm:min-w-56">
        {status === "sending" ? f.sending : f.submit}
      </Button>
    </form>
  );
}
