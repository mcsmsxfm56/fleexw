import React, { useState } from "react";
import NavBar from "../NavBar";
import MenuMobile from "../Menu/MenuMobile";
import NotificationDropdown from "../NotificationDropdown";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import MenuDesktop from "../Menu/MenuDesktop";
//comentario al pedo, borrarlo
interface propsAppLayout {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = ({ children }: propsAppLayout) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { rol } = useSesionUsuarioContext();

  return (
    <>
      <div className="fixed w-screen h-screen bg-gray-200 z-[-1]"></div>
      <header className="bg-indigo-600 text-slate-100 justify-between block md:hidden">
        <NavBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </header>
      <main className="bg-gray-200 w-full md:flex md:overflow-hidden md:h-screen">
        {rol === "trabajador" && <NotificationDropdown />}
        <MenuMobile isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <MenuDesktop />
        <div className="w-full h-full md:overflow-auto">{children}</div>
      </main>
    </>
  );
};

export default AppLayout;
