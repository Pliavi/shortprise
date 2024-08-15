"use client";
import { RSButton } from "@/components/RSButton";
import { RSInput } from "@/components/RSInput";
import { RSOpenModeSwitch } from "@/components/RSOpenModeSwitch";
import { RSRedirectFieldSet } from "@/components/RSRedirectFieldSet";
import { createShortcut } from "./actions/create-shortcut";
import { useState } from "react";
import { useAppStore } from "./stores/AppStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ShortcutCreationForm,
  ShortcutCreationFormSchema,
} from "./schemas/ShortCutCreationForm";

type ResultBag = {
  message?: string;
  url?: string;
};

export default function Home() {
  const app = useAppStore();
  const [message, setMessage] = useState<ResultBag | undefined>();
  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShortcutCreationForm>({
    defaultValues: {
      name: "",
      mode: "randomly",
      urls: [],
    },
    resolver: zodResolver(ShortcutCreationFormSchema),
  });

  async function onSubmit(data: ShortcutCreationForm) {
    app.setStatus("loading");

    console.log(data);

    const response = await createShortcut(data);
    console.log(response);

    setTimeout(() => {
      app.setStatus("");
    }, 3000);

    if (response.ok) {
      app.setStatus("success");
      setMessage({
        url: window.location.origin + "/" + data.name,
      });
      return;
    }

    app.setStatus("error");
    setMessage({
      message: response.message,
    });
    if (response.code === "VALIDATION_ERROR") {
      response.errors.forEach((error) => {
        setError(error.path.join(".") as keyof ShortcutCreationForm, {
          message: error.message,
          type: error.code,
        });
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-y-scroll h-full p-8"
    >
      {message && message.url && (
        <p className="text-sm text-green-500 text-center mb-2">
          Shortprise criado com sucesso! Siga pelo link:{" "}
          <a className="underline" href={message.url} target="_blank">
            {message.url}
          </a>
        </p>
      )}
      {message && message.message && (
        <p className="text-sm text-red-500 text-center mb-2">
          {message.message}
        </p>
      )}
      <RSInput
        {...register("name")}
        label="Qual nome do seu atalho?"
        prefix="short.pliavi.com/"
        placeholder="example"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <RSRedirectFieldSet
        control={control}
        register={register}
        errors={errors}
      />
      {errors.urls && <p className="text-red-500">{errors.urls.message}</p>}

      <div className="mt-8 mb-1 text-white font-bold">
        Como será a aberto o link?
      </div>

      <RSOpenModeSwitch registerOptions={register("mode")} />
      {errors.mode && <p className="text-red-500">{errors.mode.message}</p>}

      <RSButton
        type="submit"
        className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700"
      >
        Criar atalho
      </RSButton>

      <small className="text-xs text-center block mt-8">
        <span className="font-bold"> Obs: </span>O atalho será apagado
        automaticamente depois de 15 dias sem acesso.
      </small>
    </form>
  );
}
