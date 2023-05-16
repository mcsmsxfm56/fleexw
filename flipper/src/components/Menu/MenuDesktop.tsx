import Image from "next/image";
import React, { useContext } from "react";

import { MenuContext } from "@/context/MenuContext";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import ListaDePestanasDelMenu from "./ListaDePestanasDelMenu";
import fotoProvisoria from "@/utils/fotoProvisoria";
import ReactWhatsapp from "react-whatsapp";

const MenuDesktop = () => {
  const { logout, nombre, foto } = useSesionUsuarioContext();
  const { setShowElementsEmpresa, setShowElementsTrabajador } =
    useContext(MenuContext);

  return (
    <div
      className={`hidden md:flex flex-col w-5/12 lg:w-4/12 gap-4 top-0 left-0 h-screen bg-indigo-600 items-center justify-center p-4 `}
    >
      <div className="avatar flex flex-col items-center justify-start gap-2">
        <div className="w-20 rounded-full ">
          <Image
            src={foto || fotoProvisoria}
            width={80}
            height={80}
            alt="Picture of the user"
            priority
            placeholder="blur"
            blurDataURL={fotoProvisoria}
          />
        </div>
        <p
          className={
            "w-full block text-white capitalize font-bold text-2xl text-center md:mt-0"
          }
        >
          {nombre}
        </p>
      </div>
      <ListaDePestanasDelMenu
        setShowElementsEmpresa={setShowElementsEmpresa}
        setShowElementsTrabajador={setShowElementsTrabajador}
      />
      <div className="flex flex-col gap-4 mt-4 border-r-2 border-indigo-600 w-full">
        <div className="flex justify-between">
          <ReactWhatsapp
            // number={`phoneNumber`}
            number="+57 324 5764333"
            message="Este contacto te ayudará a navegar por la página Flipper. ¡Hazle cualquier pregunta!"
            element="a"
            className="pl-4 cursor-pointer text-indigo-600 font-bold p-2 bg-[#e5e7eb] w-full h-full border-2 border-[#e5e7eb] focus:bg-indigo-600 focus:text-white focus:border-2 focus:border-white hover:bg-indigo-600 hover:text-white transition duration-500 relative"
          >
            Boton de Ayuda
          </ReactWhatsapp>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-help w-full bg-[#e5e7eb] h-full mr-2"
              width="44"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={"#4B39EF"}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="17" x2="12" y2="17.01" />
              <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
            </svg>
          </div>
        </div>
        <div className="flex justify-between w-full h-full">
          <button
            type="button"
            className={
              "text-left text-indigo-600 font-bold p-2 bg-[#e5e7eb] pl-4 w-full h-full border-2 border-[#e5e7eb] focus:bg-indigo-600 focus:text-white focus:border-2 focus:border-white hover:bg-indigo-600 hover:text-white transition duration-500"
            }
            onClick={() => logout()}
          >
            Cerrar Sesión
          </button>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-logout h-full w-full bg-[#e5e7eb]"
              width="44"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#4B39EF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDesktop;
