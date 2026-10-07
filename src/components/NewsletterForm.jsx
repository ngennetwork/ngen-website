"use client";

import { useState } from "react";
import { submitToAppsScript } from "@/lib/submitToAppsScript";
import { site } from "@/content/site";

/**
 * One email field for application alerts. Submits to the Apps Script
 * backend (formType "newsletter"), which dedupes into the sheet.
 */
export default function NewsletterForm({ id = "alerts-email", tone = "light" }) {
  const dark = tone === "dark";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitToAppsScript({ formType: "newsletter", email });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2.5 text-lead">
        <span aria-hidden="true" className="node" />
        You’re on the list. We’ll write when the next cycle opens.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          required
          autoComplete="email"
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-11 flex-1 rounded-[var(--radius-btn)] bg-paper px-4 text-base text-ink ring-1 ring-ink/12 outline-none placeholder:text-slate/70 focus:ring-ink"
        />
        <button type="submit" disabled={status === "loading"} className={`btn ${dark ? "btn-paper" : "btn-ink"} disabled:opacity-60`}>
          {status === "loading" ? "Signing up…" : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className={`text-small ${dark ? "text-on-dark" : "text-danger"}`}>
          {error} Please try again, or write to{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
