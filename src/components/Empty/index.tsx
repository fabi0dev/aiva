import { FC } from "react";

interface EmptyProps {
  children: string;
}

export const Empty: FC<EmptyProps> = ({ children }) => {
  return (
    <div className="text-center text-sm text-gray-400 mb-3">{children}</div>
  );
};
