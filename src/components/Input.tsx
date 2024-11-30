import { type ReactNode } from "react";
import clsx from "clsx";

export const Input = ({
  id,
  className,
  label,
  type = "text",
  error,
  placeholder,
  required,
  icon = null,
}: {
  id: string;
  className?: string;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: ReactNode;
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-secondary-600 block font-medium">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div
            className={clsx("text-secondary-400 absolute left-3 top-1/2 z-0 -translate-y-1/2", {
              "text-red-600": error,
            })}
          >
            {icon}
          </div>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={clsx(
            "placeholder:text-secondary-400 relative z-10 mt-[6px] block w-full rounded-md border border-secondary-300 bg-transparent px-3 py-[7px] text-base outline-none",
            {
              "border-red-600 text-red-600 placeholder:text-red-600": error,
              "pl-10": icon,
            },
          )}
        />
      </div>
    </div>
  );
};
