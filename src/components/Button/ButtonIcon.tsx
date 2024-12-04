import { type ReactNode } from "react";

export const ButtonIcon = ({
  children,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex size-10 items-center justify-center text-secondary-500"
    >
      {children}
    </button>
  );
};
