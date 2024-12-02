import { type ReactNode } from "react";
// import { type UseFormRegister } from "react-hook-form";
import clsx from "clsx";

export const Input = ({
  id,
  className,
  label,
  placeholder,
  error,
  // register,
  icon = null,
  ...rest
}: {
  id: string;
  className?: string;
  label: string;
  placeholder?: string;
  error?: string;
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
            className={clsx("absolute left-3 top-1/2 z-0 -translate-y-1/2", {
              "text-secondary-400": !error,
              "text-red-600": error,
            })}
          >
            {icon}
          </div>
        )}

        <input
          id={id}
          type="text"
          placeholder={placeholder}
          className={clsx(
            "relative z-10 mt-[6px] block w-full rounded-md border bg-transparent px-3 py-[7px] text-base outline-none",
            {
              "border-red-600 text-red-600 placeholder:text-red-600": error,
              "placeholder:text-secondary-400 border-secondary-300": !error,
              "pl-10": icon,
            },
          )}
          {...rest}
        />
      </div>
    </div>
  );
};
