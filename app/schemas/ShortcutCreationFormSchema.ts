import { z } from "zod";

export const ShortcutCreationFormSchema = z.object({
  name: z.string().min(1, {
    message: "O nome não pode ser vazio.",
  }),
  mode: z.enum(["randomly", "sequentially"], {
    message: "Selecione um modo de abertura.",
  }),
  urls: z
    .array(
      z.object({
        value: z
          .string()
          .regex(
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            "O link deve ser uma URL."
          ),
      })
    )
    .min(1, {
      message: "Adicione pelo menos um link.",
    }),
});

export type ShortcutCreationForm = z.infer<typeof ShortcutCreationFormSchema>;
