"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

const emptyForm = {
  name: "",
  oneLiner: "",
  logo: "",
  photo: "",
  link: "",
  linkLabel: "",
  isPlaceholder: false,
};

/**
 * /admin/startups — not linked anywhere in the site nav, reached only by
 * typing the URL directly. Shares the same login session as /admin/events
 * (see ADMIN_PASSWORD in .env.example).
 *
 * Reads and writes src/data/startups.json through the /api/admin/startups
 * routes — see src/data/startups.js for how, and why that only reliably
 * persists on a normal, continuously-running server (not on Vercel's
 * serverless hosting, where each request can get a fresh filesystem).
 */
export default function AdminStartupsPage() {
  const [status, setStatus] = useState("checking"); // checking | loggedOut | loggedIn
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [startups, setStartups] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadStartups() {
    const res = await fetch("/api/admin/startups");
    if (res.status === 401) {
      setStatus("loggedOut");
      return;
    }
    const data = await res.json();
    setStartups(data.startups);
    setStatus("loggedIn");
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- session check on mount, gated by the 401 branch above; not a derived-state pattern
    loadStartups();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Login failed.");
      return;
    }
    setPassword("");
    await loadStartups();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setStatus("loggedOut");
    setStartups([]);
  }

  function startEdit(startup) {
    setEditingId(startup.id);
    setForm({
      name: startup.name,
      oneLiner: startup.oneLiner,
      logo: startup.logo || "",
      photo: startup.photo || "",
      link: startup.link || "",
      linkLabel: startup.linkLabel || "",
      isPlaceholder: Boolean(startup.isPlaceholder),
    });
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/startups/${editingId}` : "/api/admin/startups";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error || "Something went wrong.");
        return;
      }
      cancelEdit();
      await loadStartups();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this startup? This can't be undone.")) return;
    await fetch(`/api/admin/startups/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    await loadStartups();
  }

  if (status === "checking") {
    return <div className="p-10 text-center text-text">Loading…</div>;
  }

  if (status === "loggedOut") {
    return (
      <div className="mx-auto max-w-sm px-5 py-24">
        <h1 className="font-sans text-2xl font-bold text-surface-dark">
          Admin login
        </h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-lg border border-surface-dark/20 px-4 py-2.5 focus:border-accent-fill focus:outline-none"
          />
          {loginError && <p className="text-sm text-danger">{loginError}</p>}
          <Button variant="primary" type="submit" fullWidth>
            Log in
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-2xl font-bold text-surface-dark">
          Manage featured startups
        </h1>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-semibold text-surface-dark/60 hover:text-accent-fill"
        >
          Log out
        </button>
      </div>

      {/* Add / edit form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-xl border border-surface-dark/10 bg-surface-card p-6 shadow-sm"
      >
        <h2 className="font-sans font-bold text-surface-dark">
          {editingId ? "Edit startup" : "Add a new startup"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            Logo path (optional)
            <input
              value={form.logo}
              onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
              placeholder="/logos/startups/example-logo.png"
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            Team photo path (optional)
            <input
              value={form.photo}
              onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
              placeholder="/team-photos/example-team.jpg"
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            Press link
            <input
              value={form.link}
              onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              placeholder="https://..."
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            Link label
            <input
              value={form.linkLabel}
              onChange={(e) => setForm((f) => ({ ...f, linkLabel: e.target.value }))}
              placeholder="e.g. Wins $75,000 at Wharton"
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
        </div>

        <label className="block text-sm">
          One-liner
          <textarea
            required
            value={form.oneLiner}
            onChange={(e) => setForm((f) => ({ ...f, oneLiner: e.target.value }))}
            rows={2}
            className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isPlaceholder}
            onChange={(e) => setForm((f) => ({ ...f, isPlaceholder: e.target.checked }))}
          />
          Placeholder (startup not yet selected, shows a dashed TODO card)
        </label>

        {formError && <p className="text-sm text-danger">{formError}</p>}

        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : editingId ? "Save changes" : "Add startup"}
          </Button>
          {editingId && (
            <Button variant="secondary" type="button" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* Existing startups */}
      <div className="mt-10 space-y-4">
        {startups.length === 0 && (
          <p className="text-text/70">No startups yet - add one above.</p>
        )}
        {startups.map((startup) => (
          <div
            key={startup.id}
            className="flex items-start justify-between gap-4 rounded-xl border border-surface-dark/10 bg-surface-card p-5 shadow-sm"
          >
            <div>
              <p className="font-sans font-bold text-surface-dark">
                {startup.name}
              </p>
              <p className="text-sm text-text/70">{startup.oneLiner}</p>
              {startup.isPlaceholder && (
                <p className="mt-1 text-xs uppercase tracking-wide text-accent-fill">
                  Placeholder
                </p>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" size="sm" type="button" onClick={() => startEdit(startup)}>
                Edit
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(startup.id)}
                className="rounded-full border border-danger-border px-4 py-1.5 text-sm font-semibold text-danger transition-colors hover:bg-danger-tint"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
