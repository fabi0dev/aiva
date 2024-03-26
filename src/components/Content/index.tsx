import { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectorApiKeyOpenAI } from "@/store/reducers/apiKeyOpenAI";

interface ContentProps {
  children: React.ReactNode;
}

export const Content: FC<ContentProps> = ({ children }) => {
  const navigate = useNavigate();
  const { key } = useSelector(selectorApiKeyOpenAI);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != "SetKeyOpenAi" && !key) {
      navigate("/SetKeyOpenAi");
    }
  }, []);

  return (
    <div className="text-gray-200 text-sm h-[100vh] flex bg-zinc-950">
      <div className={cn("h-100% w-full flex flex-wrap justify-between ")}>
        <div className={cn("flex w-full")}>{children}</div>
      </div>
    </div>
  );
};
