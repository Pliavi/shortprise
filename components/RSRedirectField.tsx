"use client";
import React, { forwardRef } from "react";
import { RSButton } from "./RSButton";
import { RSInput } from "./RSInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const minusIcon = <FontAwesomeIcon icon={faClose} />;

interface RSRedirectFieldProps extends React.ComponentProps<"input"> {
  onRemove: () => void;
  error?: string;
}

export const RSRedirectField = forwardRef<
  HTMLInputElement,
  RSRedirectFieldProps
>(function RSRedirectField({ onRemove, ...props }, ref) {
  return (
    <div className="flex gap-2 items-start">
      <RSInput
        ref={ref}
        placeholder="example.com or https://example.com"
        {...props}
      />
      <RSButton type="button" onClick={onRemove} className="h-11">
        {minusIcon}
      </RSButton>
    </div>
  );
});
