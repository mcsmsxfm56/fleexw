import Historial from "@/components/HistorialDeEventos/Historial";
import Eventos from "@/components/ListaDeEventos/Eventos";
import NavBar from "@/components/NavBar";
import PerfilEmpresa from "@/components/Perfil/PerfilEmpresa";
import PostulacionesTrabajador from "@/components/Postulaciones/PostulacionesTrabajador";

import { useContext } from "react";
import { ShowElements } from "@/types/Types";
import CreateEventForm from "@/components/CrearEvento/CreateEventForm";
import { MenuContext } from "@/context/MenuContext";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

const hardcoded = {
  nombreEvento: "Nombre evento2",
  fechaEvento: "24 de abril 13:15HS",
  observaciones: "Observaciones",
  hora: "8:00 am",
  direccion: "Calle falsa 123, Barranquilla, Atlantico",
};

export default function Home() {
  const { showElements } = useContext(MenuContext);

  return (
    <>


      {showElements.showEventos && <Eventos />}
      {showElements.showHistorial && <Historial />}
      {showElements.showCrear && <CreateEventForm />}
      {showElements.showPostulaciones && <PostulacionesTrabajador />}
      {showElements.showPerfil && <PerfilEmpresa />}

    </>
  );
}
