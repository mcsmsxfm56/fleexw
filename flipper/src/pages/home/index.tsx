import Historial from "@/components/HistorialDeEventos/Historial";
import Eventos from "@/components/ListaDeEventos/Eventos";
import NavBar from "@/components/NavBar";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { Dispatch, SetStateAction, useState } from "react";
import { ShowElements } from "@/types/Types";

const hardcoded = {
  nombreEvento: "Nombre evento2",
  fechaEvento: "24 de abril 13:15HS",
  observaciones: "Observaciones",
  hora: "8:00 am",
  direccion: "Calle falsa 123, Barranquilla, Atlantico",
};


export default function Home() {

  const [showElements, setShowElements] = useState<ShowElements>({
    showEventos: true,
    showHistorial: false,
    showCrear: false,
    showPostulaciones: false,
    showPerfil: false,
  })

  return (
    <>
      <header className="bg-indigo-600 text-slate-100 flex justify-between">
        <NavBar showElements={showElements} setShowElements={setShowElements} />
      </header>
      <main className="bg-gray-200 md:w-4/5 md:ml-[20%] lg:ml-[250px]">
        {showElements.showEventos && <Eventos />}
        {showElements.showHistorial && <Historial />}
      </main>
    </>
  );
}
