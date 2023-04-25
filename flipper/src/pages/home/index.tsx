import Eventos from "@/components/Eventos";
import NavBar from "@/components/NavBar";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

const hardcoded = {
  nombreEvento: "Nombre evento2",
  fechaEvento: "24 de abril 13:15HS",
  observaciones: "Observaciones",
  hora: "8:00 am",
  direccion: "Calle falsa 123, Barranquilla, Atlantico",
};

export default function Home() {
  return (
    <>
      <header className="bg-indigo-600 text-slate-100 flex justify-between">
        <NavBar />
      </header>
      <main className="bg-gray-200">
        <Eventos />
      </main>
    </>
  );
}