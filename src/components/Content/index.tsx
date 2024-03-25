import { FC } from "react";
import { cn } from "@/lib/utils";
import { MenuLeft } from "@components/MenuLeft";
import { MenuBottom } from "@components/MenuBottom";

interface ContentProps {
  children: React.ReactNode;
}

export const Content: FC<ContentProps> = ({ children }) => {
  return (
    <div className="text-gray-300 text-sm h-[100vh] flex bg-zinc-900">
      {/* <MenuLeft />
      <MenuBottom /> */}

      <div className={cn("h-100% w-full flex flex-wrap justify-between ")}>
        <div className={cn("flex w-full")}>{children}</div>
      </div>
    </div>
  );
};
