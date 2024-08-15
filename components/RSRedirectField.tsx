"use client";
import React from "react";
import { RSButton } from "./RSButton";
import { RSInput } from "./RSInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const minusIcon = <FontAwesomeIcon icon={faClose} />;

interface RSRedirectFieldProps extends React.ComponentProps<"input"> {
  onRemove: () => void;
}

export const RSRedirectField = ({
  onRemove,
  ...props
}: RSRedirectFieldProps) => (
  <div className="flex gap-2">
    <RSInput
      name="urls"
      placeholder="example.com or https://example.com"
      {...props}
    />
    <RSButton type="button" onClick={onRemove}>
      {minusIcon}
    </RSButton>
  </div>
);
