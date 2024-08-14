"use client";

import React, { useEffect, useState } from "react";

type OpenMode = "sequentially" | "randomly";

interface Props {
  initialValue?: OpenMode;
  onChange?: (value: OpenMode) => void;
}

export const RSOpenModeSwitch = ({
  initialValue = "sequentially",
  onChange,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<OpenMode>(initialValue);

  useEffect(() => {
    if (onChange) {
      onChange(selectedValue);
    }
  }, [selectedValue, onChange]);

  const handleChange = (value: OpenMode) => {
    setSelectedValue(value);
  };

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
            type="radio"
            className="sr-only"
            value="sequentially"
            checked={selectedValue === "sequentially"}
            name="mode"
            onChange={() => handleChange("sequentially")}
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
            type="radio"
            className="sr-only"
            value="randomly"
            checked={selectedValue === "randomly"}
            name="mode"
            onChange={() => handleChange("randomly")}
          />
        </label>
      </div>
    </fieldset>
  );
};
