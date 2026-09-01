import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStartups, saveStartups } from "@/data/startups";
import { isValidSession, SESSION_COOKIE } from "@/lib/adminAuth";

async function requireAuth() {
  const cookieStore = await cookies();
  return isValidSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const startups = await getStartups();
  return NextResponse.json({ startups });
}

export async function POST(request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.oneLiner) {
    return NextResponse.json({ error: "Name and one-liner are required." }, { status: 400 });
  }

  const startups = await getStartups();
  const id =
    body.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now().toString(36);

  const newStartup = {
    id,
    name: body.name,
    oneLiner: body.oneLiner,
    logo: body.logo || null,
    photo: body.photo || null,
    link: body.link || "#",
    linkLabel: body.linkLabel || "",
    isPlaceholder: Boolean(body.isPlaceholder),
  };

  startups.push(newStartup);
  await saveStartups(startups);
  return NextResponse.json({ startup: newStartup }, { status: 201 });
}
