import clsx from "clsx";
import { forwardRef } from "react";

type Props = React.ComponentProps<"button"> & {};

export const RSButton = forwardRef<HTMLButtonElement, Props>(function RSButton(
  { children, className, ...props },
  ref
) {
  return (
    <button
      className={clsx(
        "inline-block rounded-lg p-2 text-white shadow-sm focus:outline-none focus:ring",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
