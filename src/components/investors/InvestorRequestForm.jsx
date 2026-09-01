"use client";

import { useState } from "react";
import { submitToAppsScript } from "@/lib/submitToAppsScript";

const ROLES = ["Angel Investor", "VC Partner / Principal", "Emerging Manager", "Tech Executive / Operator", "Other"];

const SECTORS = [
  "B2B SaaS & Enterprise",
  "AI & ML Core/Infra",
  "Healthcare & Bio",
  "EdTech",
  "Consumer & Social",
  "FinTech",
  "Climate & HardTech",
  "Other",
];

const CHECK_SIZES = [
  "< $5k (Grants & Micro-Angel)",
  "$5k – $25k (Micro Pre-Seed / SAFE)",
  "$25k – $100k (Angel / Pre-Seed)",
  "$100k+ (Seed / Lead)",
];

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-surface-card px-4 py-3 text-text placeholder:text-text-muted outline-none focus-ring-light";
const labelClasses = "block text-small font-semibold text-surface-dark";

/**
 * Investor deal-flow access request form (/capital-network/investors).
 * Posts via the shared Apps Script backend (see src/lib/submitToAppsScript.js
 * and backend/Code.gs — formType "investor-request").
 */
export default function InvestorRequestForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    role: "",
    checkSize: "",
    linkedin: "",
  });
  const [sectors, setSectors] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  function updateField(key, value) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function toggleSector(sector) {
    setSectors((cur) =>
      cur.includes(sector) ? cur.filter((s) => s !== sector) : [...cur, sector]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitToAppsScript({
        formType: "investor-request",
        ...fields,
        sectors: sectors.join(", "),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-surface-card p-10 text-center">
        <p className="font-sans text-lg font-semibold text-surface-dark">
          Thanks — your request is in.
        </p>
        <p className="mt-2 text-body text-text-muted">
          Our team reviews every request and follows up by email once you&rsquo;re matched.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="investor-name" className={labelClasses}>
            Full Name
          </label>
          <input
            id="investor-name"
            type="text"
            required
            value={fields.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={`mt-2 ${inputClasses}`}
          />
        </div>
        <div>
          <label htmlFor="investor-email" className={labelClasses}>
            Email Address
          </label>
          <input
            id="investor-email"
            type="email"
            required
            value={fields.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`mt-2 ${inputClasses}`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="investor-role" className={labelClasses}>
            Investor Role
          </label>
          <select
            id="investor-role"
            required
            value={fields.role}
            onChange={(e) => updateField("role", e.target.value)}
            className={`mt-2 ${inputClasses}`}
          >
            <option value="" disabled>
              Select one
            </option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="investor-check-size" className={labelClasses}>
            Typical Check Size
          </label>
          <select
            id="investor-check-size"
            required
            value={fields.checkSize}
            onChange={(e) => updateField("checkSize", e.target.value)}
            className={`mt-2 ${inputClasses}`}
          >
            <option value="" disabled>
              Select one
            </option>
            {CHECK_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={labelClasses}>Target Sectors</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SECTORS.map((sector) => {
            const selected = sectors.includes(sector);
            return (
              <button
                key={sector}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleSector(sector)}
                className={`focus-ring-light inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-small font-medium transition-colors ${
                  selected
                    ? "border-[#1A305A] bg-[#1A305A] text-white"
                    : "border-neutral-200 bg-white text-text hover:border-neutral-300"
                }`}
              >
                {selected && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.415 0l-3.5-3.5a1 1 0 111.415-1.415l2.792 2.793 6.793-6.793a1 1 0 011.415 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {sector}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="investor-linkedin" className={labelClasses}>
          LinkedIn / Fund URL
        </label>
        <input
          id="investor-linkedin"
          type="text"
          placeholder="https://linkedin.com/in/..."
          value={fields.linkedin}
          onChange={(e) => updateField("linkedin", e.target.value)}
          className={`mt-2 ${inputClasses}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="focus-ring-light mt-2 inline-flex items-center justify-center rounded-full bg-accent-fill px-8 py-3.5 font-sans font-semibold text-white transition-colors hover:bg-accent-fill-hover disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Request Access"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-danger">
          {error} Please try again, or email{" "}
          <a href="mailto:info@ngennetwork.org" className="underline">
            info@ngennetwork.org
          </a>
          .
        </p>
      )}
    </form>
  );
}
