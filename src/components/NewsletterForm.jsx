"use client";

import { useState } from "react";
import { submitToAppsScript } from "@/lib/submitToAppsScript";

export default function NewsletterForm({ variant = "light" }) {
  const isDark = variant === "dark";
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
      <div className={`rounded-xl p-6 text-center ${isDark ? "bg-surface-dark-raised" : "bg-neutral-100"}`}>
        <p className={`font-sans font-semibold ${isDark ? "text-on-dark" : "text-text"}`}>
          You&rsquo;re signed up - thanks for joining.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="yourname@university.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 rounded-full bg-surface-card px-5 py-3 text-text placeholder:text-text-muted outline-none ${
          isDark ? "focus-ring-dark" : "border border-neutral-200 focus-ring-light"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`rounded-full bg-accent-fill px-6 py-3 font-sans font-semibold text-white transition-colors hover:bg-accent-fill-hover disabled:opacity-60 ${
          isDark ? "focus-ring-dark" : "focus-ring-light"
        }`}
      >
        {status === "loading" ? "Signing up…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p role="alert" className="w-full text-center text-sm text-danger sm:text-left">
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
