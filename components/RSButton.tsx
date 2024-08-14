import clsx from "clsx";

type Props = React.ComponentProps<"button"> & {};

export const RSButton = ({ children, className, ...props }: Props) => {
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
};
