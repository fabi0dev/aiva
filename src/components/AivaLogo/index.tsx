import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AivaLogoProps {}

export const AivaLogo: FC<AivaLogoProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="text-center p-3 hover:opacity-90 cursor-pointer"
    >
      <div className="text-2xl mb-10 w-full">
        <span className="text-green-400 font-bold">Aiva</span>
      </div>
    </div>
  );
};
