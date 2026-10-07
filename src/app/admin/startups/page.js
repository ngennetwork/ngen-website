"use client";

import { useEffect, useState } from "react";

// Presentation only: a plain tool, drawn in the site's tokens.
const field =
  "block w-full rounded-[var(--radius-btn)] bg-paper px-3 py-2 text-ink ring-1 ring-ink/12 placeholder:text-mist focus:ring-ink focus:outline-none";
const label = "block text-small text-ink";
const btnDisabled = "disabled:pointer-events-none disabled:opacity-50";
const btnSmall = "min-h-9 px-4 text-small";
const card = "rounded-lg border border-ink/12 bg-paper";
const checkboxStyle = { accentColor: "var(--color-ink)" };

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
    return <p className="wrap text-slate">Loading…</p>;
  }

  if (status === "loggedOut") {
    return (
      <div className="wrap max-w-md">
        <h1 className="font-display text-h3 text-ink">Admin login</h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            autoFocus
            className={field}
          />
          {loginError && <p className="text-small text-danger">{loginError}</p>}
          <button type="submit" className="btn btn-ink w-full">
            Log in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="wrap max-w-3xl">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-h3 text-ink">Manage featured startups</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="link shrink-0 text-small text-slate hover:text-ink"
        >
          Log out
        </button>
      </div>

      {/* Add / edit form */}
      <form onSubmit={handleSubmit} className={`mt-8 space-y-4 p-6 ${card}`}>
        <h2 className="font-display text-lead text-ink">
          {editingId ? "Edit startup" : "Add a new startup"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`mt-1 ${field}`}
            />
          </label>
          <label className={label}>
            Logo path (optional)
            <input
              value={form.logo}
              onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
              placeholder="/logos/startups/example-logo.png"
              className={`mt-1 ${field}`}
            />
          </label>
          <label className={label}>
            Team photo path (optional)
            <input
              value={form.photo}
              onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
              placeholder="/team-photos/example-team.jpg"
              className={`mt-1 ${field}`}
            />
          </label>
          <label className={label}>
            Press link
            <input
              value={form.link}
              onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              placeholder="https://..."
              className={`mt-1 ${field}`}
            />
          </label>
          <label className={label}>
            Link label
            <input
              value={form.linkLabel}
              onChange={(e) => setForm((f) => ({ ...f, linkLabel: e.target.value }))}
              placeholder="e.g. Wins $75,000 at Wharton"
              className={`mt-1 ${field}`}
            />
          </label>
        </div>

        <label className={label}>
          One-liner
          <textarea
            required
            value={form.oneLiner}
            onChange={(e) => setForm((f) => ({ ...f, oneLiner: e.target.value }))}
            rows={2}
            className={`mt-1 ${field}`}
          />
        </label>

        <label className="flex items-center gap-2 text-small text-ink">
          <input
            type="checkbox"
            checked={form.isPlaceholder}
            onChange={(e) => setForm((f) => ({ ...f, isPlaceholder: e.target.checked }))}
            style={checkboxStyle}
          />
          Placeholder (startup not yet selected, shows a dashed TODO card)
        </label>

        {formError && <p className="text-small text-danger">{formError}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={`btn btn-ink ${btnDisabled}`}>
            {saving ? "Saving…" : editingId ? "Save changes" : "Add startup"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing startups */}
      <div className="mt-10 space-y-4">
        {startups.length === 0 && <p className="text-slate">No startups yet - add one above.</p>}
        {startups.map((startup) => (
          <div key={startup.id} className={`flex items-start justify-between gap-4 p-5 ${card}`}>
            <div>
              <p className="font-display text-lead text-ink">{startup.name}</p>
              <p className="text-small text-slate">{startup.oneLiner}</p>
              {startup.isPlaceholder && (
                <p className="mt-1 flex items-center gap-2 text-small text-slate">
                  <span className="node" aria-hidden="true" />
                  Placeholder
                </p>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => startEdit(startup)}
                className={`btn btn-ghost ${btnSmall}`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(startup.id)}
                className={`btn btn-ghost text-danger hover:bg-danger-tint ${btnSmall}`}
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
