import React, { Dispatch, SetStateAction, useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { MenuContext } from "@/context/MenuContext";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import ListaDePestanasDelMenu from "./ListaDePestanasDelMenu";
import perfilProvisorio from "../../assets/images/imagenPerfilProvisoria.png";
import { ShowElementsEmpresa } from "@/types/Types";
import ReactWhatsapp from "react-whatsapp";

interface Props {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const phoneNumber = "";

const Menu = ({ isExpanded, setIsExpanded }: Props) => {
  const { logout, nombre } = useSesionUsuarioContext();
  const { setShowElementsEmpresa, setShowElementsTrabajador } =
    useContext(MenuContext);

  return (
    <div
      className={
        !isExpanded
          ? "h-full md:w-1/4 lg:w-[250px] md:pt-20 2xl:h-screen fixed md:block top-0 md:top-0 -left-60 md:left-0 bottom-0 bg-indigo-600 lg:pt-20 flex flex-col gap-4 transition-[left] md:transition-none duration-500 ease-out z-40"
          : "h-screen 2xl:h-screen bg-indigo-600 items-center px-4 top-0 md:top-[64px] left-0 flex flex-col justify-center gap-8 transition-[left] md:transition-none duration-500 ease-out z-40 fixed"
      }>
      <div className="avatar flex flex-col items-center justify-start gap-2">
        <div className="w-20 rounded-full ">
          <Image src={perfilProvisorio} alt="Picture of the author" />
        </div>
        <p
          className={
            "w-full block text-white capitalize font-bold text-2xl text-center md:mt-0"
          }>
          {nombre}
        </p>
      </div>
      <ListaDePestanasDelMenu
        setShowElementsEmpresa={setShowElementsEmpresa}
        setShowElementsTrabajador={setShowElementsTrabajador}
        setIsExpanded={() => setIsExpanded(false)}
      />
      <div className="flex flex-col gap-4 mt-4 border-r-2 border-indigo-600">
        <div className="flex justify-between">
          <ReactWhatsapp
            // number={`phoneNumber`}
            number="1-212-736-5000"
            message="Este contacto te ayudará a navegar por la página Flipper. ¡Hazle cualquier pregunta!"
            element="a"
            className="pl-4 cursor-pointer text-indigo-600 font-bold p-2 bg-[#e5e7eb] w-full h-full border-2 border-[#e5e7eb] focus:bg-indigo-600 focus:text-white focus:border-2 focus:border-white hover:bg-indigo-600 hover:text-white transition duration-500 relative">
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
              strokeLinejoin="round">
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
            onClick={() => logout()}>
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
              strokeLinejoin="round">
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

export default Menu;
