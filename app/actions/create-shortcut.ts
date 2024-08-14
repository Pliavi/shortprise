"use server";

import { ShortcutRepository } from "@/lib/repositories/ShortcutRepository";
import { z } from "zod";

const ShortcutCreationFormSchema = z.object({
  name: z.string().min(1),
  mode: z.enum(["randomly", "sequentially"]),
  urls: z.array(z.string()),
});

export async function createShortcut(formData: FormData) {
  try {
    const { urls, ...shortcut } = ShortcutCreationFormSchema.parse({
      ...Object.fromEntries(formData),
      urls: formData.getAll("urls"),
    });

    await ShortcutRepository.create(shortcut, urls);

    return {
      ok: true,
      message: "Shortcut criado com sucesso!",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Erro ao criar o atalho",
    };
  }
}
