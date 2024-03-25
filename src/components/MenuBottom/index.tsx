import { MenuItems, menuItems } from "@/constants/menuItems";
import { cn, navigate } from "@/lib/utils";
import { FC } from "react";
import { Click } from "..";
import { useLocation } from "react-router-dom";

interface MenuBottomProps {}

export const MenuBottom: FC<MenuBottomProps> = () => {
  const location = useLocation();

  const MenuItem = ({ item }: { item: MenuItems }) => {
    return (
      <div
        className={cn(
          "flex p-2 px-5 justify-center rounded-full text-gray-100",
          location.pathname == item.url
            ? "text-sky-500  bg-gray-100 bg-opacity-5"
            : ""
        )}
      >
        <Click on={() => navigate(item.url)}>
          <div className="text-[20px] justify-center flex">{item.icon}</div>
          <div className="text-sm">{item.title}</div>
        </Click>
      </div>
    );
  };

  return (
    <div className={cn("md:hidden", " fixed w-[100%] left-0 bottom-0 z-10 ")}>
      <div
        className={cn(
          "mx-5 p-2 mb-1 backdrop-blur-3xl shadow-xl rounded-full",
          "flex justify-between"
        )}
      >
        {menuItems.map((item, index) => {
          return <MenuItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};
