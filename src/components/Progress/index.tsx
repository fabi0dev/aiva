import { cn } from "@/lib/utils";
import { FC } from "react";

interface ProgressProps {
  percent: number;
  classPercent?: string;
}

export const Progress: FC<ProgressProps> = ({ percent, classPercent }) => {
  return (
    <div className="flex bg-slate-500 h-1 rounded-xl">
      <div
        style={{ width: `${percent}%` }}
        className={cn(`h-[100%] rounded-md bg-sky-500`, classPercent)}
      ></div>
    </div>
  );
};
