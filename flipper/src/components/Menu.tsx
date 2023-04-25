import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import Link from "next/link";
import React from "react";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import perfilProvisorio from "../assets/images/imagenPerfilProvisoria.png";

interface Props {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ isExpanded, setIsExpanded }: Props) => {
  const { logout, nombre } = useSesionUsuarioContext();
  return (
    <div
      className={
        !isExpanded
          ? "h-screen flex flex-col absolute top-0 -left-32 bottom-0 transition-[left] duration-500 ease-out"
          : "h-screen flex flex-col absolute bg-gray-100 top-0 left-0 transition-[left] duration-500 ease-out rounded"
      }
    >
      <IconContext.Provider
        value={{
          color: "#3F3F3F",
          size: "1.5em",
          className: "global-class-name",
        }}
      >
        <button className="" onClick={() => setIsExpanded(!isExpanded)}>
          <FaArrowLeft />
        </button>
      </IconContext.Provider>
      <ul
        className={
          "flex flex-col items-start border-black rounded transition-all"
        }
      >
        <li className="w-full">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={`${perfilProvisorio}`} />
            </div>
          </div>
        </li>
        <li>
          <span className={"min-w-[80px] text-[#0c0019]"}>{nombre}</span>
        </li>
        <li>
          <Link href="" className={"min-w-[80px] text-[#0c0019]"}>
            Perfil
          </Link>
        </li>
        <li>
          <Link href="" className={"min-w-[80px] text-[#0c0019]"}>
            Historial
          </Link>
        </li>
        <li>
          <Link
            href="/home/crear-evento"
            className={"min-w-[80px] text-[#0c0019]"}
          >
            Crear
          </Link>
        </li>
        <li>
          <Link href="" className={"min-w-[80px] text-[#0c0019]"}>
            Confirmar
          </Link>
        </li>
        <li>
          <Link href="" className={"min-w-[80px] text-[#0c0019]"}>
            Boton de Ayuda
          </Link>
        </li>
        <li>
          <button
            className={"min-w-[80px] text-[#0c0019]"}
            onClick={() => logout()}
          >
            Salir
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
