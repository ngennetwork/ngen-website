import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getEvents, saveEvents } from "@/data/events";
import { isValidSession, SESSION_COOKIE } from "@/lib/adminAuth";

async function requireAuth() {
  const cookieStore = await cookies();
  return isValidSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function PUT(request, { params }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.date || !body?.location) {
    return NextResponse.json({ error: "Title, date, and location are required." }, { status: 400 });
  }

  const events = await getEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  const updated = {
    ...events[index],
    title: body.title,
    date: body.date,
    location: body.location,
    description: body.description || "",
    targetAudience: body.targetAudience || "",
    audience: Array.isArray(body.audience) && body.audience.length > 0 ? body.audience : ["investors"],
  };
  if (body.photo) {
    updated.photo = body.photo;
  } else {
    delete updated.photo;
  }

  events[index] = updated;
  await saveEvents(events);
  return NextResponse.json({ event: updated });
}

export async function DELETE(request, { params }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { id } = await params;
  const events = await getEvents();
  const next = events.filter((e) => e.id !== id);
  if (next.length === events.length) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  await saveEvents(next);
  return NextResponse.json({ ok: true });
}
