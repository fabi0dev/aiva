import React, { FC } from "react";
import { cn } from "@/lib/utils";

interface SubContentProps {
  children: React.ReactNode;
}

export const SubContent: FC<SubContentProps> = ({ children }) => {
  return (
    <div className={cn("w-[900px] mx-auto p-2")}>
      <div className="h-full">{children}</div>
    </div>
  );
};
