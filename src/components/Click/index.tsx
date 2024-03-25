import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ClickProps {
  children: React.ReactNode;
  className?: string;
  on?: () => void;
}

export const Click: FC<ClickProps> = ({
  children,
  on,
  className,
  ...props
}) => {
  return (
    <span
      onClick={on}
      className={cn("hover:opacity-80 cursor-pointer", className)}
      {...props}
    >
      {children}
    </span>
  );
};
