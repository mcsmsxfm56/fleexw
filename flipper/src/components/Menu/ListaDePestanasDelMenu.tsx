import React from "react";
import { ShowElementsEmpresa, ShowElementsTrabajador } from "@/types/Types";
import { useRouter } from "next/router";
import { BotonesDePestañasDelMenuEmpresa, BotonesDePestañasDelMenuTrabajador } from "@/utils/BotonesDePestañasDelMenu";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";


interface Props {
  setShowElementsEmpresa: React.Dispatch<React.SetStateAction<ShowElementsEmpresa>>;
  setShowElementsTrabajador: React.Dispatch<React.SetStateAction<ShowElementsTrabajador>>;
  setIsExpanded?: React.Dispatch<React.SetStateAction<Boolean>>;
}

const ListaDePestanasDelMenu = ({ setShowElementsEmpresa, setShowElementsTrabajador, setIsExpanded }: Props) => {

  const { rol } = useSesionUsuarioContext()

  const router = useRouter();

  const handleShowElements = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const idButton = (ev.target as HTMLButtonElement).id;
    setShowElementsEmpresa({
      showEventos: idButton === "Mis Eventos" ? true : false,
      showHistorial: idButton === "Historial" ? true : false,
      showCrear: idButton === "Crear Evento" ? true : false,
      showPerfil: idButton === "Perfil" ? true : false,
    });
    setShowElementsTrabajador({
      showEventosTrabajador: idButton === "Eventos Disponibles" ? true : false,
      showHistorialTrabajador: idButton === "Historial" ? true : false,
      showEventosConfirmadosTrabajador: idButton === "Eventos Confirmados" ? true : false,
      showPerfilTrabajador: idButton === "Perfil" ? true : false,
    });
    setIsExpanded && setIsExpanded(false);
    router.asPath !== "/home" && router.push("/home");
  };

  return (
    <ul className={"md:mt-8 flex flex-col items-start w-full gap-4"}>
      {rol === "empresa" && BotonesDePestañasDelMenuEmpresa.map((pestaña) => {
        return (
          <li
            className="w-full transition border-r-indigo-600 border-r-2"
            key={pestaña}>
            <div className="h-full flex">
              <button
                id={pestaña}
                className={
                  "text-indigo-600 font-bold p-2 pl-4 w-full text-left bg-[#e5e7eb] focus:bg-indigo-600 focus:text-white border-2 border-[#e5e7eb] hover:bg-indigo-600 hover:text-white transition duration-500"
                }
                onClick={handleShowElements}>
                {pestaña}
              </button>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right bg-[#e5e7eb] h-full w-full mr-2"
                  width="40"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#4B39EF"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </div>
            </div>
          </li>
        );
      })}
      {rol === "trabajador" && BotonesDePestañasDelMenuTrabajador.map((pestaña) => {
        return (
          <li
            className="w-full transition border-r-indigo-600 border-r-2"
            key={pestaña}>
            <div className="h-full flex">
              <button
                id={pestaña}
                className={
                  "text-indigo-600 font-bold p-2 pl-4 w-full text-left bg-[#e5e7eb] focus:bg-indigo-600 focus:text-white border-2 border-[#e5e7eb] hover:bg-indigo-600 hover:text-white transition duration-500"
                }
                onClick={handleShowElements}>
                {pestaña}
              </button>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right bg-[#e5e7eb] h-full w-full mr-2"
                  width="40"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#4B39EF"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListaDePestanasDelMenu;
