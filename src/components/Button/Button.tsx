import { type ReactNode } from "react";
import clsx from "clsx";

export const Button = ({
  children,
  className,
  variant,
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  variant: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `flex h-10 items-center justify-center gap-1 rounded-md border px-4 font-semibold disabled:cursor-not-allowed ${className}`,
        {
          "border-primary-200 bg-primary-200 text-white": variant === "primary",
          "border-primary-100 bg-white text-primary-300":
            variant === "secondary",
          "border-secondary-300 bg-white text-secondary-600 disabled:border-secondary-300 disabled:bg-secondary-300 disabled:text-secondary-400":
            variant === "tertiary",
        },
      )}
    >
      {children}
    </button>
  );
};
