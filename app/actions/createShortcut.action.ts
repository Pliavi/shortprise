"use server";

import { ShortcutRepository } from "@/lib/repositories/ShortcutRepository";
import { z } from "zod";
import {
  ShortcutCreationForm,
  ShortcutCreationFormSchema,
} from "../schemas/ShortcutCreationFormSchema";
import { ActionResult } from "@/lib/types/actions/result.types";
import { RepositoryError } from "@/lib/types/repositories/errors.types";
import { PostgresErrorCode } from "@/lib/types/database/errors.types";

export async function createShortcut(
  data: ShortcutCreationForm
): Promise<ActionResult> {
  try {
    const { urls, ...shortcut } = ShortcutCreationFormSchema.parse(data);

    await ShortcutRepository.create(
      shortcut,
      urls.map(({ value }) => value)
    );

    return { ok: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        code: "VALIDATION_ERROR",
        message:
          "Ocorreu um erro ao criar o link. Verifique os dados informados e tente novamente.",
      };
    }

    if (
      error instanceof RepositoryError &&
      error.violation === PostgresErrorCode.UniqueViolation
    ) {
      return {
        ok: false,
        code: "DUPLICATE_ERROR",
        message: "O nome para o link já existe! Escolha outro.",
      };
    }

    return {
      ok: false,
      code: "UNKNOWN_ERROR",
      message: "",
    };
  }
}
