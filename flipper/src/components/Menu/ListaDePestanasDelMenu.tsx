import React from "react";
import { ShowElements } from "@/types/Types";
import { BotonesDePestañasDelMenu } from "@/utils/BotonesDePestañasDelMenu";
import { useRouter } from "next/router";
import Home from '../../pages/home/index';


interface Props {
  setShowElements: React.Dispatch<React.SetStateAction<ShowElements>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<Boolean>>;
}

const ListaDePestanasDelMenu = ({ setShowElements, setIsExpanded }: Props) => {
  const router = useRouter()

  const handleShowElements = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const idButton = (ev.target as HTMLButtonElement).id;
    setShowElements({
      showEventos: idButton === "Mis Eventos" ? true : false,
      showHistorial: idButton === "Historial" ? true : false,
      showCrear: idButton === "Crear Evento" ? true : false,
      showPostulaciones: idButton === "Ver Postulaciones" ? true : false,
      showPerfil: idButton === "Perfil" ? true : false,
    });
    setIsExpanded(false);
    router.asPath !== "/home" && router.push("/home")
  };

  return (
    <ul
      className={
        "px-4 md:mt-8 flex flex-col gap-4 items-start border-black rounded transition-all"
      }>
      {BotonesDePestañasDelMenu.map((pestaña) => {
        return (
          <li className="w-full" key={pestaña}>
            <button
              id={pestaña}
              className={"w-full block text-white hover:bg-indigo-500 transition duration-100 py-4"}
              onClick={handleShowElements}>
              {pestaña}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListaDePestanasDelMenu;
