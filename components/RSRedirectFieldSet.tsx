"use client";
import React from "react";
import { RSButton } from "./RSButton";
import { RSRedirectField } from "./RSRedirectField";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import { ShortcutCreationForm } from "@/app/schemas/ShortCutCreationForm";

type Props = {
  control: Control<ShortcutCreationForm>;
  register: UseFormRegister<ShortcutCreationForm>;
  errors: FieldErrors<ShortcutCreationForm>;
};

export const RSRedirectFieldSet = ({ control, register, errors }: Props) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "urls",
  });

  return (
    <>
      <div className="mb-1 font-bold text-white mt-8">Redirecionamentos</div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <RSRedirectField
              key={field.id}
              onRemove={() => remove(index)}
              {...register(`urls.${index}.value`)}
            />
            {errors.urls?.[index]?.value?.message && (
              <p className="text-red-500">
                {errors.urls?.[index]?.value?.message}
              </p>
            )}
          </React.Fragment>
        ))}
        <RSButton
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto"
          onClick={() => {
            append({ value: "" });
          }}
        >
          Adicionar redirecionamento
        </RSButton>
      </div>
    </>
  );
};
