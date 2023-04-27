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
      <header className="bg-indigo-600 text-slate-100 flex justify-between">
        <NavBar />
      </header>
      <main className="bg-gray-200 w-full md:w-4/5 md:ml-[20%] lg:ml-[250px] xl:w-full xl:ml-0">
        {showElements.showEventos && <Eventos />}
        {showElements.showHistorial && <Historial />}
        {showElements.showCrear && <CreateEventForm />}
        {showElements.showPostulaciones && <PostulacionesTrabajador />}
        {showElements.showPerfil && <PerfilEmpresa />}
      </main>
    </>
  );
}
