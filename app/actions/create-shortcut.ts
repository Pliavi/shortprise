"use server";

import { ShortcutRepository } from "@/lib/repositories/ShortcutRepository";
import { z, ZodIssue } from "zod";

const ShortcutCreationFormSchema = z.object({
  name: z.string().min(1),
  mode: z.enum(["randomly", "sequentially"]),
  urls: z.array(z.string()),
});

export type ShortcutCreationForm = z.infer<typeof ShortcutCreationFormSchema>;

export async function createShortcut(formData: FormData) {
  try {
    const { urls, ...shortcut } = ShortcutCreationFormSchema.parse({
      ...Object.fromEntries(formData),
      urls: formData
        .getAll("urls")
        .map(
          (url) =>
            "https://" +
            url
              .toString()
              .replaceAll("https://", "")
              .replaceAll("http://", "")
              .trim()
        ),
    });

    const shortcutInsertData = {
      ...shortcut,
      url_count: urls.length,
    };

    await ShortcutRepository.create(shortcutInsertData, urls);

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
        message: "Ocorreu um erro ao criar o atalho.",
      };
    }

    console.error(error);

    return {
      ok: false,
      type: "UNKNOWN_ERROR",
      message: "Ocorreu um erro ao criar o atalho.",
    };
  }
}
