import React, { FC } from "react";

interface PopoverItemProps {
  children: React.ReactNode;
}

export const PopoverItem: FC<PopoverItemProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="w-full flex items-center gap-3 cursor-pointer text-sm hover:opacity-75"
    >
      {children}
    </div>
  );
};
