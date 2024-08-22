import { ShortcutRepository } from "@/lib/repositories/ShortcutRepository";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authorization = req.headers.get("Authorization");
  const secretBearerToken = `Bearer ${process.env.CRON_SECRET}`;

  if (!process.env.CRON_SECRET || authorization !== secretBearerToken) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await ShortcutRepository.deleteAllUnused();

  return NextResponse.json({ ok: true });
}
