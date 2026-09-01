"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

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
          Manage upcoming events
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
          {editingId ? "Edit event" : "Add a new event"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            Date
            <input
              required
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              placeholder="e.g. October 4, 2026"
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            Venue / location
            <input
              required
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            Photo path (optional)
            <input
              value={form.photo}
              onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
              placeholder="/about/events/example.jpg"
              className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
            />
          </label>
        </div>

        <label className="block text-sm">
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={2}
            className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          Target audience blurb (shown on the investor bubble)
          <input
            value={form.targetAudience}
            onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-surface-dark/20 px-3 py-2 focus:border-accent-fill focus:outline-none"
          />
        </label>

        <div className="text-sm">
          <span className="block">Show on</span>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.audience.includes("investors")}
                onChange={() => toggleAudience("investors")}
              />
              Investors page
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.audience.includes("founders")}
                onChange={() => toggleAudience("founders")}
              />
              Founders page
            </label>
          </div>
        </div>

        {formError && <p className="text-sm text-danger">{formError}</p>}

        <div className="flex gap-3">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : editingId ? "Save changes" : "Add event"}
          </Button>
          {editingId && (
            <Button variant="secondary" type="button" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* Existing events */}
      <div className="mt-10 space-y-4">
        {events.length === 0 && (
          <p className="text-text/70">No events yet - add one above.</p>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start justify-between gap-4 rounded-xl border border-surface-dark/10 bg-surface-card p-5 shadow-sm"
          >
            <div>
              <p className="font-sans font-bold text-surface-dark">
                {event.title}
              </p>
              <p className="text-sm text-text/70">
                {event.date} · {event.location}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-text/50">
                {event.audience.join(", ")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" size="sm" type="button" onClick={() => startEdit(event)}>
                Edit
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(event.id)}
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
