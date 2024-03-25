import { FC } from "react";

interface SpinnerTypingProps {
  className?: string;
}

export const SpinnerTyping: FC<SpinnerTypingProps> = ({
  className = "bg-color-main",
}) => {
  return (
    <div className="loader">
      <span className={className} />
      <span className={className} />
      <span className={className} />
    </div>
  );
};
