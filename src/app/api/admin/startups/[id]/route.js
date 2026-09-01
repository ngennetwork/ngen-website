import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStartups, saveStartups } from "@/data/startups";
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
  if (!body?.name || !body?.oneLiner) {
    return NextResponse.json({ error: "Name and one-liner are required." }, { status: 400 });
  }

  const startups = await getStartups();
  const index = startups.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Startup not found." }, { status: 404 });
  }

  const updated = {
    ...startups[index],
    name: body.name,
    oneLiner: body.oneLiner,
    logo: body.logo || null,
    photo: body.photo || null,
    link: body.link || "#",
    linkLabel: body.linkLabel || "",
    isPlaceholder: Boolean(body.isPlaceholder),
  };

  startups[index] = updated;
  await saveStartups(startups);
  return NextResponse.json({ startup: updated });
}

export async function DELETE(request, { params }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { id } = await params;
  const startups = await getStartups();
  const next = startups.filter((s) => s.id !== id);
  if (next.length === startups.length) {
    return NextResponse.json({ error: "Startup not found." }, { status: 404 });
  }

  await saveStartups(next);
  return NextResponse.json({ ok: true });
}
