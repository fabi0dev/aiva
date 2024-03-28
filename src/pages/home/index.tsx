import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiMic2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectorLocation, setDataWeather } from "@/store/reducers/location";
import { Avatar, AvatarImage } from "@components/Avatar";
import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { cn } from "@/lib/utils";
import { IoChatbubblesOutline } from "react-icons/io5";
import { getLocationAndWeather } from "@/lib/weather";

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
        <div className="p-4 mx-auto justify-center items-center flex bg-gray-800 rounded-full text-green-500 text-4xl">
          {icon}
        </div>
        <div className="mt-2">{desc}</div>
      </div>
    );
  };

  const dispatch = useDispatch();
  const { weather } = useSelector(selectorLocation);

  const getLocationData = async () => {
    const data = await getLocationAndWeather();
    dispatch(setDataWeather(data));
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
            <div className=" justify-center items-center gap-16 grid grid-cols-2">
              <ItemComum
                desc="Chat"
                icon={<IoChatbubblesOutline />}
                url="Chat"
              />
              <ItemComum desc="Comando" icon={<RiMic2Fill />} url="command" />
            </div>
          </div>

          {weather?.description && (
            <div className="flex fixed top-5 right-5">
              <div className="p-1">
                <Avatar>
                  <AvatarImage src={weather?.icon} />
                </Avatar>
              </div>
              <div className="text-center">
                <div className="text-2xl">{weather?.temperature}°c</div>
                <div className="text-xs">{weather.city}</div>
              </div>
            </div>
          )}
        </div>
      </SubContent>
    </Content>
  );
};
