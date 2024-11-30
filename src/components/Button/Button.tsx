import { type ReactNode } from "react";
import clsx from "clsx";

export const Button = ({
  children,
  className,
  variant,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  variant: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={type}
      className={clsx(
        `flex h-10 items-center justify-center gap-1 rounded-md border px-4 font-semibold ${className}`,
        {
          "border-primary-200 bg-primary-200 text-white": variant === "primary",
          "border-primary-100 bg-white text-primary-300": variant === "secondary",
          "text-secondary-600 border-secondary-300 bg-white": variant === "tertiary",
        },
      )}
    >
      {children}
    </button>
  );
};
