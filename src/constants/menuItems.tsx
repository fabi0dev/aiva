import { RiHomeLine } from "react-icons/ri";

export type MenuItems = {
  icon: React.ReactNode;
  title: string;
  url: string;
};

export const menuItems: MenuItems[] = [
  {
    icon: <RiHomeLine />,
    title: "Visão Geral",
    url: "/",
  },
];
