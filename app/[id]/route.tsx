import { ShortcutRepository } from "@/lib/repositories/ShortcutRepository";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_request: Request, { params }: Context) {
  const { id } = params;
  try {
    const shortcut = await ShortcutRepository.get(id);
    const urlRow = await ShortcutRepository.getNextUrl(shortcut);

    return NextResponse.redirect(urlRow.url);
  } catch (error) {
    return NextResponse.redirect(new URL("/404", _request.url));
  }
}
