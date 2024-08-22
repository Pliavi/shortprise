import clsx from "clsx";
import { forwardRef } from "react";

type Props = React.ComponentProps<"input"> & {
  label?: string;
  prefix?: string;
  error?: string;
};

export const RSInput = forwardRef<HTMLInputElement, Props>(function RSInput(
  { label, prefix, error, className, ...props },
  ref
) {
  return (
    <div className="w-full space-y-2">
      <label className="block font-bold text-white">
        {label && <div className="mb-1">{label}</div>}

        <div className="flex text-base font-normal">
          {prefix && (
            <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-300 bg-opacity-20">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            type="text"
            className={clsx(
              "inline-block h-11 flex-1 w-full flex-shrink border-white border-opacity-5 border bg-white bg-opacity-10 rounded-lg p-2 shadow focus:outline-none focus:ring-2  focus:ring-purple-500 focus:ring-inset focus:ring-opacity-30",
              prefix && "rounded-l-none",
              className
            )}
            {...props}
          />
        </div>
      </label>
      {error && <p className="text-rose-600">{error}</p>}
    </div>
  );
});
