"use client";
import { RSButton } from "@/components/RSButton";
import { RSInput } from "@/components/RSInput";
import { RSOpenModeSwitch } from "@/components/RSOpenModeSwitch";
import { RSRedirectFieldSet } from "@/components/RSRedirectFieldSet";
import { createShortcut } from "./actions/createShortcut.action";
import { useEffect, useState } from "react";
import { useAppStore } from "./stores/AppStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ShortcutCreationForm,
  ShortcutCreationFormSchema,
} from "./schemas/ShortcutCreationFormSchema";
import { ActionResult } from "@/lib/types/actions/result.types";

type ResultBag = ActionResult & {
  url?: string;
};

const version = process.env.VERCEL_GIT_COMMIT_SHA;

export default function HomePage() {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    setLocation(window.location);
  }, [setLocation]);

  const app = useAppStore();
  const [result, setResult] = useState<ResultBag | undefined>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShortcutCreationForm>({
    defaultValues: {
      name: "",
      mode: "randomly",
      urls: [{ value: "" }],
    },
    resolver: zodResolver(ShortcutCreationFormSchema),
  });

  async function onSubmit(data: ShortcutCreationForm) {
    app.setStatus("loading");

    const result = await createShortcut(data);
    setTimeout(() => app.setStatus(""), 1500);

    if (!result.ok) {
      setResult(result);
      app.setStatus("error");
      return;
    }

    app.setStatus("success");

    setResult({ ...result, url: `${location?.origin}/${data.name}` });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-y-scroll h-full p-8"
    >
      {result?.ok && result.url && (
        <p className="text-sm text-green-500 text-center mb-2">
          Shortprise criado com sucesso! Siga pelo link:{" "}
          <a className="underline" href={result.url} target="_blank">
            {result.url}
          </a>
        </p>
      )}

      {result?.ok === false && result.message && (
        <p className="text-sm text-red-500 text-center mb-2">
          {result.message}
        </p>
      )}

      <RSInput
        {...register("name")}
        label="Qual nome do seu atalho?"
        prefix={`${location?.host}/`}
        placeholder="exemplo"
        error={errors.name?.message}
      />

      <div className="mt-6 mb-2 font-bold text-white">Redirecionamentos</div>
      <RSRedirectFieldSet
        control={control}
        register={register}
        errors={errors}
        error={errors.urls?.message}
      />

      <div className="mt-6 mb-2 text-white font-bold">
        Como será a aberto o link?
      </div>
      <RSOpenModeSwitch
        registerOptions={register("mode")}
        error={errors.mode?.message}
      />

      <RSButton type="submit" className="w-full mt-6" variant="primary">
        Criar atalho
      </RSButton>

      <small className="text-xs text-center block mt-8">
        <span className="font-bold">Obs:</span> O atalho será apagado
        automaticamente depois de 15 dias sem acesso.
      </small>
      <small className="text-[10px] text-end block mt-4 -mr-4 -mb-4 text-[#5c5c5c]">
        ver.{version}
      </small>
    </form>
  );
}
