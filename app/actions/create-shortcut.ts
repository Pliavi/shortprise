"use server";

import { ShortcutRepository } from "@/lib/repositories/ShortcutRepository";
import { z, ZodIssue } from "zod";
import {
  ShortcutCreationForm,
  ShortcutCreationFormSchema,
} from "../schemas/ShortCutCreationForm";

export async function createShortcut(data: ShortcutCreationForm) {
  try {
    const { urls, ...shortcut } = ShortcutCreationFormSchema.parse(data);

    const shortcutInsertData = {
      ...shortcut,
      url_count: urls.length,
    };

    await ShortcutRepository.create(
      shortcutInsertData,
      urls.map((url) => url.value)
    );

    return {
      ok: true,
      message: "Shortcut criado com sucesso!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorBag = error.errors as ZodIssue[];

      return {
        ok: false,
        code: "VALIDATION_ERROR",
        errors: errorBag,
        message: "Ocorreu um erro de validação ao criar o atalho.",
      };
    }

    console.error(error);

    return {
      ok: false,
      type: "UNKNOWN_ERROR",
      message:
        "Ocorreu um erro ao criar o atalho. Provavelmente um atalho com esse nome já existe.",
    };
  }
}
