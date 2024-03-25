import { default as Pages } from "../pages";
import { createHashRouter, RouterProvider } from "react-router-dom";

export default function Routers() {
  const routers = Object.entries(Pages).map(([nameScreen, Component]) => {
    nameScreen = nameScreen == "Home" ? "/" : nameScreen;

    return {
      path: nameScreen,
      element: <Component />,
    };
  });

  return <RouterProvider router={createHashRouter([...routers])} />;
}
