import React, { FC } from "react";
import { cn } from "@/lib/utils";

interface SubContentProps {
  children: React.ReactNode;
  maxScreen?: boolean;
}

export const SubContent: FC<SubContentProps> = ({ children, maxScreen }) => {
  return (
    <div className={cn("mx-auto ", maxScreen ? "w-full" : "w-[900px]")}>
      <div className="h-full">{children}</div>
    </div>
  );
};
