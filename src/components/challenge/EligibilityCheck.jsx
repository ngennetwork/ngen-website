"use client";

import { createContext, useContext, useEffect, useId, useState } from "react";
import { site } from "@/content/site";
import { sessions } from "@/components/challenge/sessions";
import { useLocale } from "@/components/challenge/ChallengeShell";
import { validateLead } from "@/lib/challengeLead";
import ExternalLink from "@/components/ui/ExternalLink";
import PageLink from "@/components/ui/PageLink";

const EligibilityContext = createContext(null);

const DIAL_CODES = [
  { code: "+852", en: "Hong Kong", "zh-Hant": "香港", "zh-Hans": "香港" },
  { code: "+853", en: "Macau", "zh-Hant": "澳門", "zh-Hans": "澳门" },
  { code: "+86", en: "Mainland China", "zh-Hant": "中國內地", "zh-Hans": "中国内地" },
  { code: "+886", en: "Taiwan", "zh-Hant": "台灣", "zh-Hans": "台湾" },
  { code: "+65", en: "Singapore", "zh-Hant": "新加坡", "zh-Hans": "新加坡" },
  { code: "+60", en: "Malaysia", "zh-Hant": "馬來西亞", "zh-Hans": "马来西亚" },
  { code: "+81", en: "Japan", "zh-Hant": "日本", "zh-Hans": "日本" },
  { code: "+82", en: "Korea", "zh-Hant": "韓國", "zh-Hans": "韩国" },
  { code: "+66", en: "Thailand", "zh-Hant": "泰國", "zh-Hans": "泰国" },
  { code: "+84", en: "Vietnam", "zh-Hant": "越南", "zh-Hans": "越南" },
  { code: "+63", en: "Philippines", "zh-Hant": "菲律賓", "zh-Hans": "菲律宾" },
  { code: "+62", en: "Indonesia", "zh-Hant": "印尼", "zh-Hans": "印尼" },
  { code: "+91", en: "India", "zh-Hant": "印度", "zh-Hans": "印度" },
  { code: "+61", en: "Australia", "zh-Hant": "澳洲", "zh-Hans": "澳大利亚" },
  { code: "+44", en: "United Kingdom", "zh-Hant": "英國", "zh-Hans": "英国" },
  { code: "+1", en: "US / Canada", "zh-Hant": "美國／加拿大", "zh-Hans": "美国／加拿大" },
];

const fieldClass =
  "min-h-11 w-full rounded-[0.375rem] bg-white px-3 text-[16px] text-ink ring-1 ring-ink/15 outline-none focus:ring-2 focus:ring-[#1c3a2a] aria-invalid:ring-[#9f1239]";

export function EligibilityState({ children }) {
  const [values, setValues] = useState({
    parentName: "",
    parentEmail: "",
    countryCode: "+852",
    whatsapp: "",
    gradeOrAge: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [result, setResult] = useState(null);
  const [row, setRow] = useState(null);
  const [savedSessionId, setSavedSessionId] = useState("");
  const [pendingSessionId, setPendingSessionId] = useState("");
  const [sessionStatus, setSessionStatus] = useState("idle");
  const [submittedFrom, setSubmittedFrom] = useState("");

  function setField(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    if (!fieldErrors[name] && name !== "countryCode") return;
    const next = { ...fieldErrors };
    delete next[name === "countryCode" ? "whatsapp" : name];
    setFieldErrors(next);
    if (Object.keys(next).length === 0) setError("");
  }

  async function submit(language, from) {
    const parsed = validateLead({ ...values, language });
    if (!parsed.ok) {
      setFieldErrors(parsed.errors);
      setError("summary");
      setStatus("error");
      setSubmittedFrom(from);
      return false;
    }
    setStatus("loading");
    setError("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/startup-challenge/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: parsed.value.parentName,
          parentEmail: parsed.value.parentEmail,
          countryCode: values.countryCode,
          whatsapp: values.whatsapp,
          gradeOrAge: parsed.value.gradeOrAge,
          language,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setFieldErrors(body?.fields || {});
        setError(body?.error === "invalid" ? "summary" : body?.error || "generic");
        setStatus("error");
        return false;
      }
      setResult({ eligible: body.eligible === true, parentEmail: parsed.value.parentEmail });
      setRow(body.row || null);
      setSubmittedFrom(from);
      setStatus("success");
      return true;
    } catch {
      setError("unreachable");
      setStatus("error");
      return false;
    }
  }

  async function chooseSession(id, language) {
    if (!result?.parentEmail || sessionStatus === "saving") return;
    setSessionStatus("saving");
    setPendingSessionId(id);
    try {
      const res = await fetch("/api/startup-challenge/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentEmail: result.parentEmail,
          sessionId: id,
          language,
          row,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setSessionStatus("error");
      } else {
        setSavedSessionId(id);
        setSessionStatus("saved");
      }
    } catch {
      setSessionStatus("error");
    } finally {
      setPendingSessionId("");
    }
  }

  return (
    <EligibilityContext.Provider
      value={{
        values,
        setField,
        status,
        error,
        fieldErrors,
        result,
        savedSessionId,
        pendingSessionId,
        sessionStatus,
        submittedFrom,
        submit,
        chooseSession,
      }}
    >
      {children}
    </EligibilityContext.Provider>
  );
}

export default function EligibilityCheck({ instanceId, showTitle = true }) {
  const { lang, copy } = useLocale();
  const check = copy.check;
  const state = useContext(EligibilityContext);
  if (!state) throw new Error("EligibilityCheck must be used inside EligibilityState");

  useEffect(() => {
    if (state.status !== "success" || state.submittedFrom !== instanceId) return;
    const el = document.getElementById(`result-${instanceId}`);
    if (!el) return;
    el.focus();
  }, [instanceId, state.status, state.submittedFrom]);

  if (state.status === "success" && state.result) {
    return <ThankYou instanceId={instanceId} />;
  }

  return (
    <form
      id={instanceId}
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const ok = await state.submit(lang, instanceId);
        if (!ok) {
          requestAnimationFrame(() => form.querySelector("[aria-invalid='true']")?.focus());
        }
      }}
      noValidate
      aria-busy={state.status === "loading"}
      className="flex flex-col gap-5 rounded-xl bg-paper p-6 text-ink shadow-[0_24px_50px_-28px_rgb(21_24_21/0.35)] ring-1 ring-ink/10 max-lg:p-7"
    >
      {showTitle && (
        <div>
          <h2 className="font-display text-[1.65rem] leading-tight">{check.title}</h2>
          <p className="mt-2 text-base leading-relaxed text-slate">{check.intro}</p>
        </div>
      )}
      {state.status === "error" && (
        <div role="alert" className="rounded-[0.375rem] bg-white px-4 py-3 ring-1 ring-ink/10">
          <p>{check.errors[state.error] || check.errors.generic}</p>
          <p className="mt-2 text-small">
            <a href={`mailto:${site.email}?subject=${encodeURIComponent(copy.emailSubject)}`} className="link">
              {site.email}
            </a>
          </p>
        </div>
      )}
      <Field
        id={`${instanceId}-parent`}
        label={check.parentName}
        value={state.values.parentName}
        error={state.fieldErrors.parentName ? check.errors.parentName : ""}
        autoComplete="name"
        onChange={(value) => state.setField("parentName", value)}
      />
      <Field
        id={`${instanceId}-email`}
        label={check.parentEmail}
        type="email"
        value={state.values.parentEmail}
        error={state.fieldErrors.parentEmail ? check.errors.parentEmail : ""}
        autoComplete="email"
        onChange={(value) => state.setField("parentEmail", value)}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor={`${instanceId}-whatsapp`} className="text-small font-medium">
          {check.whatsapp}
        </label>
        <div className="grid gap-2 sm:grid-cols-[11.5rem_minmax(0,1fr)]">
          <select
            aria-label={check.countryCode}
            value={state.values.countryCode}
            onChange={(event) => state.setField("countryCode", event.target.value)}
            className={fieldClass}
          >
            {DIAL_CODES.map((item) => (
              <option key={item.code} value={item.code}>
                {item[lang] || item.en} {item.code}
              </option>
            ))}
          </select>
          <input
            id={`${instanceId}-whatsapp`}
            inputMode="tel"
            autoComplete="tel-national"
            value={state.values.whatsapp}
            aria-invalid={state.fieldErrors.whatsapp ? true : undefined}
            aria-describedby={state.fieldErrors.whatsapp ? `${instanceId}-whatsapp-error` : undefined}
            onChange={(event) => state.setField("whatsapp", event.target.value)}
            className={fieldClass}
          />
        </div>
        {state.fieldErrors.whatsapp && (
          <p id={`${instanceId}-whatsapp-error`} className="text-small text-[#9f1239]">
            {check.errors.whatsapp}
          </p>
        )}
      </div>
      <Field
        id={`${instanceId}-grade`}
        label={check.gradeOrAge}
        value={state.values.gradeOrAge}
        hint={check.gradeHint}
        error={state.fieldErrors.gradeOrAge ? check.errors.gradeOrAge : ""}
        onChange={(value) => state.setField("gradeOrAge", value)}
      />
      <button type="submit" disabled={state.status === "loading"} className="btn btn-ink self-start disabled:opacity-60">
        {state.status === "loading" ? check.submitting : check.submit}
      </button>
      <PageLink href={copy.applyPath} className="link self-start text-small">
        {check.fullApply}
      </PageLink>
    </form>
  );
}

function ThankYou({ instanceId }) {
  const { lang, copy } = useLocale();
  const check = copy.check;
  const state = useContext(EligibilityContext);
  const eligible = state.result.eligible;
  const chosen = sessions.options.find((option) => option.id === state.savedSessionId);

  return (
    <div
      id={`result-${instanceId}`}
      tabIndex={-1}
      role={state.submittedFrom === instanceId ? "status" : undefined}
      data-eligibility={eligible ? "eligible" : "ineligible"}
      className="flex flex-col gap-5 rounded-xl bg-paper p-6 text-ink shadow-[0_24px_50px_-28px_rgb(21_24_21/0.35)] ring-1 ring-ink/10 outline-none max-lg:p-7"
    >
      <div>
        <h2 className="font-display text-[1.65rem] leading-tight">{eligible ? check.eligibleTitle : check.ineligibleTitle}</h2>
        <p className="mt-2 text-base leading-relaxed text-slate">{eligible ? check.eligibleBody : check.ineligibleBody}</p>
      </div>
      <div className="flex flex-col gap-3 border-t border-ink/10 pt-5">
        <ExternalLink href={sessions.consultUrl} className="btn btn-ink h-auto self-start whitespace-normal px-4 py-3 text-left">
          {check.consult}
        </ExternalLink>
        <p className="text-small text-slate">{copy.feesNote}</p>
      </div>
      <div className="flex flex-col gap-3 border-t border-ink/10 pt-5">
        <h3 className="font-display text-[1.25rem] leading-tight">{check.sessionTitle}</h3>
        <p className="text-base leading-relaxed text-slate">
          {check.sessionNote.replace("{minutes}", String(sessions.durationMinutes))}{" "}
          <ExternalLink href={sessions.zoomUrl} className="link">
            Zoom
          </ExternalLink>
        </p>
        <div className="flex flex-col gap-2">
          {sessions.options.map((option) => {
            const selected = state.savedSessionId === option.id;
            const saving = state.sessionStatus === "saving" && state.pendingSessionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                disabled={state.sessionStatus === "saving"}
                onClick={() => state.chooseSession(option.id, lang)}
                className={`btn h-auto w-full justify-start px-4 py-3 text-left leading-snug whitespace-normal ${selected ? "btn-ink" : "btn-ghost"}`}
              >
                {saving ? check.sessionSaving : option.when[lang] || option.when.en}
              </button>
            );
          })}
        </div>
        {state.sessionStatus === "saved" && chosen && (
          <p role="status" className="text-small text-[#1c3a2a]">
            {check.sessionChosen}
          </p>
        )}
        {state.sessionStatus === "error" && <p role="alert" className="text-small text-[#9f1239]">{check.sessionError}</p>}
      </div>
      <PageLink href={copy.applyPath} className="link self-start text-small">
        {check.fullApply}
      </PageLink>
    </div>
  );
}

function Field({ id, label, value, onChange, error, hint, type = "text", autoComplete }) {
  const hintId = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-small font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? hintId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
      {error ? (
        <p id={`${id}-error`} className="text-small text-[#9f1239]">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="text-small text-slate">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
