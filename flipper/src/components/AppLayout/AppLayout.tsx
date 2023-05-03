import React, { useState } from "react";
import NavBar from "../NavBar";
import Menu from "../Menu/Menu";
import LogIn from "../../pages/index";
import NotificationDropdown from "../NotificationDropdown";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

interface propsAppLayout {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = ({ children }: propsAppLayout) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { rol } = useSesionUsuarioContext();

  return (
    <>
      <header className="bg-indigo-600 text-slate-100 flex justify-between block lg:hidden">
        <NavBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </header>
      <main className="bg-gray-200 w-full md:w-4/5 md:ml-[20%] lg:ml-[250px] xl:w-full xl:ml-0">
        <Menu isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        {rol === "trabajador" && <NotificationDropdown />}
        {children}
      </main>
    </>
  );
};

export default AppLayout;
