"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { useLocale } from "@/components/challenge/ChallengeShell";
import { validateApplication, validateResume } from "@/lib/challengeApplication";
import PageLink from "@/components/ui/PageLink";

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
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = validateApplication({
      parentName: data.get("parentName"),
      email: data.get("email"),
      phone: data.get("phone"),
      countryCity: data.get("countryCity"),
      name: data.get("studentName"),
      age: data.get("age"),
      school: data.get("school"),
      grade: data.get("grade"),
      interests: data.get("interests"),
      guardian: data.get("guardian"),
      schoolContactName: data.get("schoolContactName"),
      schoolContactEmail: data.get("schoolContactEmail"),
      language: lang,
    });
    const resumeCheck = validateResume(data.get("resume"), lang);
    const nextFields = { ...parsed.fields };
    if (!resumeCheck.ok) nextFields.resume = resumeCheck.error;
    if (Object.keys(nextFields).length > 0) {
      setFields(nextFields);
      setError(apply.errors.summary);
      setStatus("error");
      setAttempt((n) => n + 1);
      return;
    }

    setStatus("loading");
    setError("");
    setFields({});
    try {
      const res = await fetch("/api/startup-challenge/apply", { method: "POST", body: data });
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
      <div id="application-received" ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-5 rounded-xl bg-paper p-6 text-ink ring-1 ring-ink/10 outline-none">
        <h3 className="font-display text-h3">{apply.successTitle}</h3>
        <p className="text-base leading-relaxed text-slate">{apply.successBody}</p>
        <PageLink href="/startup-challenge" className="btn btn-ghost">
          {apply.back}
        </PageLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onChange={onFormChange} noValidate aria-busy={status === "loading"} className="flex flex-col gap-8 rounded-xl bg-paper p-6 text-ink shadow-[0_24px_50px_-32px_rgb(21_24_21/0.28)] ring-1 ring-ink/10">
      <input type="hidden" name="language" value={lang} />
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

      <fieldset className="flex flex-col gap-5">
        <legend className="font-display text-[1.5rem]">{apply.parentLegend}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id={`${formId}-parent`} name="parentName" label={apply.fields.parentName} autoComplete="name" required error={fields.parentName} />
          <TextField id={`${formId}-email`} name="email" type="email" label={apply.fields.email} autoComplete="email" required error={fields.email} />
          <TextField id={`${formId}-phone`} name="phone" type="text" label={apply.fields.phone} autoComplete="tel" required error={fields.phone} />
          <TextField id={`${formId}-place`} name="countryCity" label={apply.fields.countryCity} autoComplete="address-level2" required error={fields.countryCity} />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="font-display text-[1.5rem]">{apply.studentLegend}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id={`${formId}-student`} name="studentName" label={apply.fields.studentName} autoComplete="name" required error={fields.name} />
          <TextField id={`${formId}-age`} name="age" inputMode="numeric" label={apply.fields.age} required error={fields.age} />
          <TextField id={`${formId}-school`} name="school" label={apply.fields.school} autoComplete="organization" required error={fields.school} />
          <SelectField id={`${formId}-grade`} name="grade" label={apply.fields.grade} required error={fields.grade} defaultValue="">
            <option value="">{apply.fields.gradePlaceholder}</option>
            {["9", "10", "11", "12"].map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </SelectField>
          <TextField id={`${formId}-school-contact`} name="schoolContactName" label={apply.fields.schoolContactName} autoComplete="name" error={fields.schoolContactName} />
          <TextField id={`${formId}-school-email`} name="schoolContactEmail" type="email" label={apply.fields.schoolContactEmail} autoComplete="email" required error={fields.schoolContactEmail} />
        </div>
        <p className="text-base leading-relaxed text-slate">{apply.copyNote}</p>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-interests`} className="text-small font-medium">
            {apply.fields.interests}
          </label>
          <textarea
            id={`${formId}-interests`}
            name="interests"
            required
            rows={5}
            aria-invalid={fields.interests ? true : undefined}
            aria-describedby={fields.interests ? `${formId}-interests-error` : `${formId}-interests-hint`}
            className={`${fieldClass} min-h-36 py-3`}
          />
          {fields.interests ? (
            <p id={`${formId}-interests-error`} className="text-small text-[#9f1239]">
              {fields.interests}
            </p>
          ) : (
            <p id={`${formId}-interests-hint`} className="text-small text-slate">
              {apply.fields.interestsHint}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-resume`} className="text-small font-medium">
            {apply.fields.resume}
          </label>
          <input
            id={`${formId}-resume`}
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-invalid={fields.resume ? true : undefined}
            aria-describedby={fields.resume ? `${formId}-resume-error` : `${formId}-resume-hint`}
            className="block w-full text-small text-slate file:mr-4 file:inline-flex file:min-h-11 file:items-center file:rounded-[0.375rem] file:border-0 file:bg-ink file:px-4 file:text-small file:font-medium file:text-[#fbfaf7]"
          />
          {fields.resume ? (
            <p id={`${formId}-resume-error`} className="text-small text-[#9f1239]">
              {fields.resume}
            </p>
          ) : (
            <p id={`${formId}-resume-hint`} className="text-small text-slate">
              {apply.fields.resumeHint}
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-[1.075rem] leading-relaxed">
          <input
            type="checkbox"
            name="guardian"
            value="yes"
            required
            aria-invalid={fields.guardian ? true : undefined}
            aria-describedby={fields.guardian ? `${formId}-guardian-error` : undefined}
            className="mt-1 size-4 accent-[#1c3a2a]"
          />
          <span>{apply.fields.guardian}</span>
        </label>
        {fields.guardian && (
          <p id={`${formId}-guardian-error`} className="text-small text-[#9f1239]">
            {fields.guardian}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === "loading"} className="btn btn-ink self-start disabled:opacity-60">
        {status === "loading" ? apply.submitting : apply.submit}
      </button>
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

function SelectField({ id, name, label, error, children, ...rest }) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-small font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="text-small text-[#9f1239]">
          {error}
        </p>
      )}
    </div>
  );
}
