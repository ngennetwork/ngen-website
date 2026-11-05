"use client";

import { useEffect, useId, useRef, useState } from "react";
import { challenge } from "@/components/challenge/content";
import { site } from "@/content/site";
import { validateApplication, validateResume } from "@/lib/challengeApplication";
import PageLink from "@/components/ui/PageLink";

const inputClass =
  "min-h-11 w-full rounded-[var(--radius-btn)] bg-paper px-4 text-base text-ink ring-1 ring-ink/12 outline-none placeholder:text-slate/70 focus:ring-ink aria-invalid:ring-danger";

const { apply, applyPath } = challenge;
const mailto = `mailto:${site.email}?subject=${encodeURIComponent("NGEN Start-Up Challenge application")}`;

export default function ApplyForm() {
  const formId = useId();
  const alertRef = useRef(null);
  const successRef = useRef(null);
  const [applyingAs, setApplyingAs] = useState("solo");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState({});
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!attempt) return;
    const invalid = document.querySelector("[aria-invalid='true']");
    const target = invalid || alertRef.current;
    target?.focus();
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
    if (name === "applyingAs" && event.target.value !== "team") {
      delete next.cofounderName;
      delete next.cofounderEmail;
      delete next.cofounderSchool;
    }
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
      name: data.get("name"),
      email: data.get("email"),
      grade: data.get("grade"),
      dob: data.get("dob"),
      school: data.get("school"),
      phone: data.get("phone"),
      motivation: data.get("motivation"),
      applyingAs: data.get("applyingAs"),
      cofounderName: data.get("cofounderName"),
      cofounderEmail: data.get("cofounderEmail"),
      cofounderSchool: data.get("cofounderSchool"),
      guardian: data.get("guardian"),
    });
    const resumeCheck = validateResume(data.get("resume"));
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
        const code = body?.error;
        setFields(body?.fields || {});
        setError(apply.errors[code] || apply.errors.generic);
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
      <div id="application-received" ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-5 outline-none">
        <h3 className="font-display text-h3">{apply.successTitle}</h3>
        <p className="text-lead text-slate">{apply.successBody}</p>
        <PageLink href="/startup-challenge" className="btn btn-ghost">
          {apply.back}
        </PageLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onChange={onFormChange} noValidate aria-busy={status === "loading"} className="flex flex-col gap-6">
      {status === "error" && (
        <div ref={alertRef} tabIndex={-1} role="alert" className="rounded-xl bg-paper px-5 py-4 text-base outline-none">
          <p>{error}</p>
          <p className="mt-2 text-small text-slate">
            <a href={mailto} className="link text-ink">
              {site.email}
            </a>
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id={`${formId}-name`} name="name" label={apply.fields.name} autoComplete="name" required error={fields.name} />
        <TextField
          id={`${formId}-email`}
          name="email"
          type="email"
          label={apply.fields.email}
          autoComplete="email"
          required
          error={fields.email}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField id={`${formId}-grade`} name="grade" label={apply.fields.grade} required error={fields.grade} defaultValue="">
          <option value="">{apply.fields.gradePlaceholder}</option>
          {["9", "10", "11", "12"].map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </SelectField>
        <TextField id={`${formId}-dob`} name="dob" type="date" label={apply.fields.dob} autoComplete="bday" error={fields.dob} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={`${formId}-school`}
          name="school"
          label={apply.fields.school}
          autoComplete="organization"
          required
          error={fields.school}
        />
        <TextField id={`${formId}-phone`} name="phone" type="tel" label={apply.fields.phone} autoComplete="tel" error={fields.phone} />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-small text-ink">{apply.fields.applyingAs}</legend>
        <div className="flex flex-col gap-2">
          {[
            ["solo", apply.fields.solo],
            ["team", apply.fields.team],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-3 text-base">
              <input
                type="radio"
                name="applyingAs"
                value={value}
                checked={applyingAs === value}
                onChange={() => setApplyingAs(value)}
                className="size-4 accent-[var(--color-signal)]"
              />
              {label}
            </label>
          ))}
        </div>
        {fields.applyingAs && <p className="text-small text-danger">{fields.applyingAs}</p>}
        {applyingAs === "team" && (
          <div className="mt-2 grid gap-6 sm:grid-cols-2">
            <TextField
              id={`${formId}-cofounder-name`}
              name="cofounderName"
              label={apply.fields.cofounderName}
              autoComplete="name"
              required
              error={fields.cofounderName}
            />
            <TextField
              id={`${formId}-cofounder-email`}
              name="cofounderEmail"
              type="email"
              label={apply.fields.cofounderEmail}
              autoComplete="email"
              error={fields.cofounderEmail}
            />
            <TextField
              id={`${formId}-cofounder-school`}
              name="cofounderSchool"
              label={apply.fields.cofounderSchool}
              autoComplete="organization"
              error={fields.cofounderSchool}
              className="sm:col-span-2"
            />
            <p className="text-small text-slate sm:col-span-2">{apply.fields.teamHint}</p>
          </div>
        )}
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${formId}-motivation`} className="text-small text-ink">
          {apply.fields.motivation}
        </label>
        <textarea
          id={`${formId}-motivation`}
          name="motivation"
          required
          rows={5}
          aria-invalid={fields.motivation ? true : undefined}
          aria-describedby={fields.motivation ? `${formId}-motivation-error` : `${formId}-motivation-hint`}
          className={`${inputClass} min-h-36 py-3`}
        />
        {fields.motivation ? (
          <p id={`${formId}-motivation-error`} className="text-small text-danger">
            {fields.motivation}
          </p>
        ) : (
          <p id={`${formId}-motivation-hint`} className="text-small text-slate">
            {apply.fields.motivationHint}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${formId}-resume`} className="text-small text-ink">
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
          className="block w-full text-small text-slate file:mr-4 file:inline-flex file:min-h-11 file:items-center file:rounded-[var(--radius-btn)] file:border-0 file:bg-ink file:px-4 file:text-small file:font-medium file:text-snow"
        />
        {fields.resume ? (
          <p id={`${formId}-resume-error`} className="text-small text-danger">
            {fields.resume}
          </p>
        ) : (
          <p id={`${formId}-resume-hint`} className="text-small text-slate">
            {apply.fields.resumeHint}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-base">
          <input
            type="checkbox"
            name="guardian"
            value="yes"
            required
            aria-invalid={fields.guardian ? true : undefined}
            aria-describedby={fields.guardian ? `${formId}-guardian-error` : undefined}
            className="mt-1 size-4 accent-[var(--color-signal)]"
          />
          <span>{apply.fields.guardian}</span>
        </label>
        {fields.guardian && (
          <p id={`${formId}-guardian-error`} className="text-small text-danger">
            {fields.guardian}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "loading"} className="btn btn-ink disabled:opacity-60">
          {status === "loading" ? apply.submitting : apply.submit}
        </button>
        <PageLink href={`${applyPath.replace(/\/apply$/, "")}#book`} className="link text-small">
          {apply.book}
        </PageLink>
      </div>
    </form>
  );
}

function TextField({ id, name, label, error, className = "", ...rest }) {
  const errorId = `${id}-error`;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-small text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClass}
        {...rest}
      />
      {error && (
        <p id={errorId} className="text-small text-danger">
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
      <label htmlFor={id} className="text-small text-ink">
        {label}
      </label>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClass}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
