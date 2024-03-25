import { cn } from "@/lib/utils";
import { FC } from "react";

interface DividerProps {
  className?: string;
  transparent?: boolean;
}

export const Divider: FC<DividerProps> = ({
  className,
  transparent = true,
}) => {
  return (
    <div
      className={cn(
        "w-full  border-sky-20 border-b-[1px] my-5",
        transparent ? "opacity-0" : " opacity-5",
        className
      )}
    ></div>
  );
};
