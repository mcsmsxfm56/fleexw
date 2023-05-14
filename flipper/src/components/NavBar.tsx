import { MenuContext } from "@/context/MenuContext";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { BotonesDePestañasDelMenuEmpresa, BotonesDePestañasDelMenuTrabajador } from "@/utils/BotonesDePestañasDelMenu";
import { useContext } from 'react';


interface Props {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isExpanded, setIsExpanded }: Props) => {
  const { rol } = useSesionUsuarioContext()
  const { showElementsEmpresa, showElementsTrabajador } = useContext(MenuContext)

  let tituloNavBar = ""
  if (rol === "trabajador") {
    Object.entries(showElementsTrabajador).forEach((showElement) => {
      if (showElement[1] === true) {
        switch (showElement[0]) {
          case "showHistorialTrabajador": tituloNavBar = "Mi Historial"
            break
          case "showPerfilTrabajador": tituloNavBar = "Mi Perfil"
            break
          case "showEventosConfirmadosTrabajador": tituloNavBar = "Mis Eventos Confirmados"
            break
          case "showEventosTrabajador": tituloNavBar = "Eventos Disponibles"
            break
        }
      }
    });
  }
  if (rol === "empresa") {
    Object.entries(showElementsEmpresa).forEach((showElement) => {
      if (showElement[1] === true) {
        switch (showElement[0]) {
          case "showEventos": tituloNavBar = "Mis Eventos"
            break
          case "showHistorial": tituloNavBar = "Mi Historial"
            break
          case "showCrear": tituloNavBar = "Crear Evento"
            break
          case "showPerfil": tituloNavBar = "Mi Perfil"
            break
        }
      }
    });
  }

  return (
    <nav className="navbar fixed bg-indigo-600 w-full h-[50px] z-50">
      <div className="flex-none">
        <button
          className="btn btn-square btn-sm btn-ghost md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-7 h-7 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 justify-center">
        <span className="normal-case text-xl font-bold">
          {tituloNavBar}
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
