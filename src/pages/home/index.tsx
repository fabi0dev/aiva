import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import { RiHome2Line, RiMic2Fill, RiChat1Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AivaLogo } from "@components/AivaLogo";
import { fetchG1Local } from "@/services/notices";

interface ItemComumProps {
  desc: string;
  url: string;
  icon: React.ReactNode;
}
export const Home: FC = () => {
  const ItemComum = ({ desc, icon, url }: ItemComumProps) => {
    const navigate = useNavigate();

    useEffect(() => {
      fetchG1Local();
    }, []);

    return (
      <div
        onClick={() => navigate(url)}
        className="text-center grid grid-rows-2 mt-4 cursor-pointer hover:opacity-80"
      >
        <div className="p-4 mx-auto justify-center items-center flex border border-zinc-500 rounded-full text-zinc-100">
          {icon}
        </div>
        <div className="mt-2">{desc}</div>
      </div>
    );
  };
  return (
    <Content>
      <SubContent>
        <div className={cn("h-full w-full  justify-center pt-[100px]")}>
          <AivaLogo />
          <div className="text-center">
            <div className="text-3xl font-bold">O que você quer fazer?</div>
          </div>

          <div className="w-[500px] mt-20 mx-auto flex justify-center ">
            <div className="flex justify-center items-center gap-16 ">
              <ItemComum
                desc="Chat"
                icon={<RiChat1Fill className="text-2xl" />}
                url="Chat"
              />

              <div className="text-center grid grid-rows-2 cursor-pointer hover:opacity-80">
                <div className="p-5 mx-auto justify-center items-center flex bg-blue-500  rounded-full">
                  <RiMic2Fill className="text-4xl text-white" />
                </div>
                <div className="mt-2">Comando</div>
              </div>

              <ItemComum
                desc="Visão Geral"
                icon={<RiHome2Line className="text-2xl" />}
                url="/OverView"
              />
            </div>
          </div>
        </div>
      </SubContent>
    </Content>
  );
};
