import { FC } from "react";

interface LabelProps {
  children: React.ReactNode;
}

interface LabelTitleProps {
  children: string;
}

export const Label: FC<LabelProps> = ({ children }) => {
  return <div className="mb-3 flex flex-wrap items-center">{children}</div>;
};

export const LabelTitle: FC<LabelTitleProps> = ({ children }) => {
  return <div className="flex w-full mb-1">{children}</div>;
};
