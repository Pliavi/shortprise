"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  registerOptions: UseFormRegisterReturn;
}

export const RSOpenModeSwitch = ({ registerOptions }: Props) => {
  return (
    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <legend className="sr-only">Modo de abertura</legend>
      <div>
        <label className="block cursor-pointer rounded-lg border border-gray-100 bg-white border-opacity-5 bg-opacity-20 p-4 text-sm font-medium shadow-sm hover:border-gray-100 hover:border-opacity-25 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
          <div>
            <p className="text-white font-bold">Sequencialmente</p>

            <p className="mt-1 text-gray-300">
              Toda vez que alguém entrar no seu atalho ele irá abrir sempre o
              próximo link da lista de cima pra baixo.
            </p>
          </div>

          <input
            {...registerOptions}
            type="radio"
            className="sr-only"
            value="sequentially"
          />
        </label>
      </div>

      <div>
        <label className="block cursor-pointer rounded-lg border border-gray-100 bg-white border-opacity-5 bg-opacity-15 p-4 text-sm font-medium shadow-sm hover:border-gray-100 hover:border-opacity-25 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
          <div>
            <p className="text-white font-bold">Aleatoriamente</p>

            <p className="mt-1 text-gray-300">
              Toda vez que alguém entrar no seu atalho ele irá sempre abrir um
              link aleatório.
            </p>
          </div>

          <input
            {...registerOptions}
            type="radio"
            className="sr-only"
            value="randomly"
          />
        </label>
      </div>
    </fieldset>
  );
};
