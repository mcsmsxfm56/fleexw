import React, { useState } from "react";
import NavBar from "../NavBar";
import Menu from "../Menu/Menu";
import LogIn from "../../pages/index";

interface propsAppLayout {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = ({ children }: propsAppLayout) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <header className="bg-indigo-600 text-slate-100 flex justify-between">
        <NavBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </header>
      <main className="bg-gray-200 w-full md:w-4/5 md:ml-[20%] lg:ml-[250px] top-0 xl:w-full xl:ml-0 absolute">
        <Menu isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
