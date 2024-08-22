import clsx from "clsx";
import { forwardRef } from "react";

type Props = React.ComponentProps<"button"> & {
  variant?: "primary";
};

export const RSButton = forwardRef<HTMLButtonElement, Props>(function RSButton(
  { children, className, variant, ...props },
  ref
) {
  return (
    <button
      className={clsx(
        "inline-block rounded-lg p-2 text-white shadow-sm focus:outline-none focus:ring",
        variant === "primary" && "bg-indigo-600 hover:bg-indigo-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
