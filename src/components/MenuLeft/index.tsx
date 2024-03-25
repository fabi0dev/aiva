import { MenuItems, menuItems } from "@/constants/menuItems";
import { cn, navigate } from "@/lib/utils";
import { FC } from "react";
import { Avatar, Click } from "..";
import { AvatarImage } from "@components/Avatar";
import { useLocation } from "react-router-dom";

interface MenuLeftProps {}

export const MenuLeft: FC<MenuLeftProps> = () => {
  const location = useLocation();

  const MenuItem = ({ item }: { item: MenuItems }) => {
    return (
      <Click on={() => navigate(item.url)}>
        <div
          className={cn(
            "flex items-center gap-x-4 mb-8 p-2 pl-5 -ml-5 cursor-pointer rounded-xl w-[80%]",
            location.pathname == item.url
              ? "text-slate-200  bg-opacity-45 bg-sky-500"
              : "text-gray-400"
          )}
        >
          <div className="text-xl">{item.icon}</div>
          <div className="text-sm">{item.title}</div>
        </div>
      </Click>
    );
  };
  return (
    <div className={cn("hidden md:block w-[20%] h-100% p-6")}>
      <Click on={() => navigate("/")}>
        <Avatar className="bg-slate-950 w-20 h-20 rounded-2xl mb-10">
          <AvatarImage src="avatar_aiva.png" />
        </Avatar>
      </Click>

      <div className={cn("text-slate-200")}>Aiva Assistent</div>

      <div className="mt-12">
        {menuItems.map((item, index) => {
          return <MenuItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};
