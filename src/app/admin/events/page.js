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
  title: "",
  date: "",
  location: "",
  description: "",
  targetAudience: "",
  audience: ["investors"],
  photo: "",
};

/**
 * /admin/events — not linked anywhere in the site nav, reached only by
 * typing the URL directly. Gated by a single shared password (see
 * ADMIN_PASSWORD in .env.example) rather than real user accounts, since
 * this is a one-person (or small-team) tool, not a multi-user product.
 *
 * Reads and writes src/data/events.json through the /api/admin/events
 * routes — see src/data/events.js for how, and why that only reliably
 * persists on a normal, continuously-running server (not on Vercel's
 * serverless hosting, where each request can get a fresh filesystem).
 */
export default function AdminEventsPage() {
  const [status, setStatus] = useState("checking"); // checking | loggedOut | loggedIn
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadEvents() {
    const res = await fetch("/api/admin/events");
    if (res.status === 401) {
      setStatus("loggedOut");
      return;
    }
    const data = await res.json();
    setEvents(data.events);
    setStatus("loggedIn");
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- session check on mount, gated by the 401 branch above; not a derived-state pattern
    loadEvents();
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
    await loadEvents();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setStatus("loggedOut");
    setEvents([]);
  }

  function startEdit(event) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description || "",
      targetAudience: event.targetAudience || "",
      audience: event.audience || ["investors"],
      photo: event.photo || "",
    });
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  }

  function toggleAudience(value) {
    setForm((f) => {
      const has = f.audience.includes(value);
      const next = has ? f.audience.filter((a) => a !== value) : [...f.audience, value];
      return { ...f, audience: next };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events";
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
      await loadEvents();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event? This can't be undone.")) return;
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    await loadEvents();
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
        <h1 className="font-display text-h3 text-ink">Manage upcoming events</h1>
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
          {editingId ? "Edit event" : "Add a new event"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={`mt-1 ${field}`}
            />
          </label>
          <label className={label}>
            Date
            <input
              required
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              placeholder="e.g. October 4, 2026"
              className={`mt-1 ${field}`}
            />
          </label>
          <label className={label}>
            Venue / location
            <input
              required
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className={`mt-1 ${field}`}
            />
          </label>
          <label className={label}>
            Photo path (optional)
            <input
              value={form.photo}
              onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
              placeholder="/about/events/example.jpg"
              className={`mt-1 ${field}`}
            />
          </label>
        </div>

        <label className={label}>
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={2}
            className={`mt-1 ${field}`}
          />
        </label>

        <label className={label}>
          Target audience blurb (shown on the investor bubble)
          <input
            value={form.targetAudience}
            onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))}
            className={`mt-1 ${field}`}
          />
        </label>

        <div className="text-small text-ink">
          <span className="block">Show on</span>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.audience.includes("investors")}
                onChange={() => toggleAudience("investors")}
                style={checkboxStyle}
              />
              Investors page
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.audience.includes("founders")}
                onChange={() => toggleAudience("founders")}
                style={checkboxStyle}
              />
              Founders page
            </label>
          </div>
        </div>

        {formError && <p className="text-small text-danger">{formError}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={`btn btn-ink ${btnDisabled}`}>
            {saving ? "Saving…" : editingId ? "Save changes" : "Add event"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing events */}
      <div className="mt-10 space-y-4">
        {events.length === 0 && <p className="text-slate">No events yet - add one above.</p>}
        {events.map((event) => (
          <div key={event.id} className={`flex items-start justify-between gap-4 p-5 ${card}`}>
            <div>
              <p className="font-display text-lead text-ink">{event.title}</p>
              <p className="text-small text-slate">
                {event.date} · {event.location}
              </p>
              <p className="mt-1 text-small text-slate">{event.audience.join(", ")}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => startEdit(event)}
                className={`btn btn-ghost ${btnSmall}`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(event.id)}
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
