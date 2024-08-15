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
      z.object(
        {
          value: z.string().url({
            message: "O link deve ser uma URL.",
          }),
        },
        {
          message: "seila",
        }
      ),

      {
        message: "Adicione pelo menos um link222.",
      }
    )
    .min(1, {
      message: "Adicione pelo menos um link.",
    }),
});

export type ShortcutCreationForm = z.infer<typeof ShortcutCreationFormSchema>;
