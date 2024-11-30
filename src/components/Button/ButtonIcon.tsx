import { type ReactNode } from "react";

export const ButtonIcon = ({
  children,
  type = "button",
}: {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button type={type} className="text-secondary-500 flex size-10 items-center justify-center">
      {children}
    </button>
  );
};
