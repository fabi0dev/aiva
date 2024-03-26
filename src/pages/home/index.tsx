import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiHome2Line, RiMic2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectorLocation, setDataLocation } from "@/store/reducers/location";
import { GetLocation } from "@/services/server";
import { Avatar, AvatarImage } from "@components/Avatar";
import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { cn } from "@/lib/utils";
import { IoChatbubblesOutline } from "react-icons/io5";

interface ItemComumProps {
  desc: string;
  url: string;
  icon: JSX.Element;
}

export const Home: FC = () => {
  const navigate = useNavigate();

  const ItemComum: FC<ItemComumProps> = ({ desc, icon, url }) => {
    return (
      <div
        onClick={() => navigate(url)}
        className="text-center grid grid-rows-2 mt-4 cursor-pointer hover:opacity-80"
      >
        <div className="p-4 mx-auto justify-center items-center flex bg-gray-900 rounded-full text-green-100">
          {icon}
        </div>
        <div className="mt-2">{desc}</div>
      </div>
    );
  };

  const dispatch = useDispatch();
  const { weather, location } = useSelector(selectorLocation);

  const getLocationData = async () => {
    const data = await GetLocation();
    dispatch(setDataLocation(data));
  };

  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <Content>
      <SubContent>
        <div className={cn("h-full w-full  justify-center pt-[100px]")}>
          <div className="text-center">
            <div className="text-3xl ">
              <span className="font-bold">O que você quer fazer?</span>
            </div>
          </div>

          <div className="w-[500px] mt-20 mx-auto flex justify-center ">
            <div className=" justify-center items-center gap-16 grid grid-cols-3">
              <ItemComum
                desc="Chat"
                icon={<IoChatbubblesOutline className="text-2xl" />}
                url="Chat"
              />

              <div
                onClick={() => navigate("/command")}
                className="text-center grid grid-rows-2 cursor-pointer hover:opacity-80"
              >
                <div className="p-5 mx-auto justify-center items-center flex rounded-full bg-gray-800">
                  <RiMic2Fill className="text-4xl text-green-500" />
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

          {location?.locality && (
            <div className="flex fixed top-5 right-5">
              <div className="p-1">
                <Avatar>
                  <AvatarImage
                    src={weather?.currentCondition.currentRaw.urlIcon}
                  />
                </Avatar>
              </div>
              <div className="text-center">
                <div className="text-2xl">
                  {weather?.currentCondition.currentTemperature}°c
                </div>
                <div className="text-xs">{location?.locality}</div>
              </div>
            </div>
          )}
        </div>
      </SubContent>
    </Content>
  );
};
