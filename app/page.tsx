"use client";
import { RSButton } from "@/components/RSButton";
import { RSInput } from "@/components/RSInput";
import { RSOpenModeSwitch } from "@/components/RSOpenModeSwitch";
import { RSRedirectFieldSet } from "@/components/RSRedirectFieldSet";
import { createShortcut } from "./actions/create-shortcut";
import { useState } from "react";
import { useAppStore } from "./stores/AppStore";

export default function Home() {
  const app = useAppStore();
  const [message, setMessage] = useState<string | null>(null);

  async function create(e: FormData) {
    app.setStatus("loading");
    const response = await createShortcut(e);
    setMessage(response.message);
    if (!response.ok) {
      app.setStatus("error");
    } else {
      app.setStatus("success");
    }

    setTimeout(() => {
      app.setStatus("");
    }, 3000);
  }

  return (
    <form action={create} className="overflow-y-scroll h-full p-8">
      {message && <p className="text-sm text-green-500">{message}</p>}
      <RSInput
        label="Qual nome do seu atalho?"
        name="name"
        prefix="short.pliavi.com/"
        placeholder="hello-petter"
      />

      <RSRedirectFieldSet />

      <div className="mt-8 mb-1 text-white font-bold">
        Como será a aberto o link?
      </div>
      <RSOpenModeSwitch />

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
