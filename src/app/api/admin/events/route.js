import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getEvents, saveEvents } from "@/data/events";
import { isValidSession, SESSION_COOKIE } from "@/lib/adminAuth";

async function requireAuth() {
  const cookieStore = await cookies();
  return isValidSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const events = await getEvents();
  return NextResponse.json({ events });
}

export async function POST(request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.date || !body?.location) {
    return NextResponse.json({ error: "Title, date, and location are required." }, { status: 400 });
  }

  const events = await getEvents();
  const id =
    body.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now().toString(36);

  const newEvent = {
    id,
    title: body.title,
    date: body.date,
    location: body.location,
    description: body.description || "",
    targetAudience: body.targetAudience || "",
    audience: Array.isArray(body.audience) && body.audience.length > 0 ? body.audience : ["investors"],
    ...(body.photo ? { photo: body.photo } : {}),
  };

  events.push(newEvent);
  await saveEvents(events);
  return NextResponse.json({ event: newEvent }, { status: 201 });
}
