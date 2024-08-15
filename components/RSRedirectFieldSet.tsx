"use client";
import React from "react";
import { RSButton } from "./RSButton";
import { RSRedirectField } from "./RSRedirectField";

export const RSRedirectFieldSet = () => {
  const idGenerator = React.useRef(0);
  const [urls, setUrls] = React.useState([
    {
      id: idGenerator.current++,
      url: "",
    },
  ]);

  const handleAddUrl = () => {
    setUrls([...urls, { id: idGenerator.current++, url: "" }]);
  };

  const handleRemoveUrl = (id: number) => {
    setUrls(urls.filter((url) => url.id !== id));
  };

  return (
    <>
      <div className="mb-1 font-bold text-white mt-8">Redirecionamentos</div>
      <div className="space-y-2">
        {urls.map((url) => (
          <RSRedirectField
            key={url.id}
            onRemove={() => handleRemoveUrl(url.id)}
          />
        ))}
        <RSButton
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto"
          onClick={handleAddUrl}
        >
          Adicionar redirecionamento
        </RSButton>
      </div>
    </>
  );
};
