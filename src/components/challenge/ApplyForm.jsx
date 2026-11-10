"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { useLocale } from "@/components/challenge/ChallengeShell";
import { validateConsultation } from "@/lib/challengeLead";

const fieldClass =
  "min-h-11 w-full rounded-[0.375rem] bg-white px-4 text-[16px] text-ink ring-1 ring-ink/15 outline-none focus:ring-2 focus:ring-[#1c3a2a] aria-invalid:ring-[#9f1239]";

export default function ApplyForm() {
  const { lang, copy } = useLocale();
  const apply = copy.apply;
  const formId = useId();
  const alertRef = useRef(null);
  const successRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState({});
  const [attempt, setAttempt] = useState(0);
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(copy.emailSubject)}`;

  useEffect(() => {
    if (!attempt) return;
    const invalid = document.querySelector("[aria-invalid='true']");
    (invalid || alertRef.current)?.focus();
  }, [attempt]);

  useEffect(() => {
    if (status !== "success") return;
    const el = successRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    el.focus({ preventScroll: true });
  }, [status]);

  function onFormChange(event) {
    const name = event.target?.name;
    if (!name || !fields[name]) return;
    const next = { ...fields };
    delete next[name];
    setFields(next);
    if (Object.keys(next).length === 0) {
      setError("");
      setStatus("idle");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = validateConsultation({
      parentName: data.get("parentName"),
      email: data.get("email"),
      phone: data.get("phone"),
      gradeOrAge: data.get("gradeOrAge"),
      note: data.get("note"),
      language: lang,
    });
    if (!parsed.ok) {
      setFields(parsed.errors);
      setError(apply.errors.summary);
      setStatus("error");
      setAttempt((n) => n + 1);
      return;
    }

    setStatus("loading");
    setError("");
    setFields({});
    try {
      const res = await fetch("/api/startup-challenge/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.value, language: lang }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setFields(body?.fields || {});
        setError(apply.errors[body?.error] || apply.errors.generic);
        setStatus("error");
        setAttempt((n) => n + 1);
        return;
      }
      setStatus("success");
    } catch {
      setError(apply.errors.unreachable);
      setStatus("error");
      setAttempt((n) => n + 1);
    }
  }

  if (status === "success") {
    return (
      <div id="application-received" ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-5 rounded-xl bg-paper p-6 text-ink ring-1 ring-ink/10 outline-none max-lg:p-7">
        <h3 className="font-display text-h3">{apply.successTitle}</h3>
        <p className="text-base leading-relaxed text-slate">{apply.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onChange={onFormChange} noValidate aria-busy={status === "loading"} className="flex flex-col gap-5 rounded-xl bg-paper p-6 text-ink shadow-[0_24px_50px_-32px_rgb(21_24_21/0.28)] ring-1 ring-ink/10 max-lg:p-7">
      {status === "error" && (
        <div ref={alertRef} tabIndex={-1} role="alert" className="rounded-xl bg-white px-5 py-4 outline-none">
          <p>{error}</p>
          <p className="mt-2 text-small">
            <a href={mailto} className="link">
              {site.email}
            </a>
          </p>
        </div>
      )}

      <TextField id={`${formId}-parent`} name="parentName" label={apply.fields.parentName} autoComplete="name" required error={fields.parentName} />
      <TextField id={`${formId}-email`} name="email" type="email" label={apply.fields.email} autoComplete="email" required error={fields.email} />
      <TextField id={`${formId}-phone`} name="phone" type="text" label={apply.fields.phone} autoComplete="tel" error={fields.phone} />
      <TextField
        id={`${formId}-grade`}
        name="gradeOrAge"
        label={apply.fields.gradeOrAge}
        placeholder={apply.fields.gradePlaceholder}
        required
        error={fields.gradeOrAge}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor={`${formId}-note`} className="text-small font-medium">
          {apply.fields.note}
        </label>
        <textarea
          id={`${formId}-note`}
          name="note"
          rows={4}
          aria-invalid={fields.note ? true : undefined}
          aria-describedby={fields.note ? `${formId}-note-error` : undefined}
          className={`${fieldClass} min-h-28 py-3`}
        />
        {fields.note && (
          <p id={`${formId}-note-error`} className="text-small text-[#9f1239]">
            {fields.note}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === "loading"} className="btn w-full bg-[#1c3a2a] text-[#fbfaf7] shadow-none hover:bg-[#274e39] whitespace-normal px-4 text-center disabled:opacity-60 sm:w-auto">
        {status === "loading" ? apply.submitting : apply.submit}
      </button>
      <p className="text-small leading-relaxed text-slate">{apply.reassure}</p>
    </form>
  );
}

function TextField({ id, name, label, error, className = "", ...rest }) {
  const errorId = `${id}-error`;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-small font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
        {...rest}
      />
      {error && (
        <p id={errorId} className="text-small text-[#9f1239]">
          {error}
        </p>
      )}
    </div>
  );
}
