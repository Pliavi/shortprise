import React from "react";
import { RSButton } from "./RSButton";
import { RSRedirectField } from "./RSRedirectField";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { ShortcutCreationForm } from "@/app/schemas/ShortcutCreationFormSchema";

type Props = {
  control: Control<ShortcutCreationForm>;
  register: UseFormRegister<ShortcutCreationForm>;
  errors: FieldErrors<ShortcutCreationForm>;
  error?: string;
};

export const RSRedirectFieldSet = ({ control, register, errors }: Props) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "urls",
  });

  function handleClickAddRedirect() {
    append({ value: "" });
  }

  function handleClickRemoveRedirect(index: number) {
    remove(index);
  }

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <RSRedirectField
          key={field.id}
          {...register(`urls.${index}.value`)}
          onRemove={() => handleClickRemoveRedirect(index)}
          error={errors.urls?.[index]?.value?.message}
        />
      ))}

      <RSButton
        type="button"
        className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto"
        onClick={handleClickAddRedirect}
      >
        Adicionar redirecionamento
      </RSButton>

      {errors.urls && <p className="text-red-500">{errors.urls.message}</p>}
    </div>
  );
};
