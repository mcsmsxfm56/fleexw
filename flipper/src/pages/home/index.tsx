import EventCard from "@/components/EventCard";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { log } from "console";

const hardcoded = {
  nombreEvento: "Nombre evento2",
  fechaEvento: "24 de abril 13:15HS",
  observaciones: "Observaciones",
  hora: "8:00 am",
  direccion: "Calle falsa 123, Barranquilla, Atlantico",
};

export default function Home() {
  const { logout, nombre } = useSesionUsuarioContext();

  const handleCerrarSesion = () => {
    logout();
  };

  return (
    <div>
      <div className="bg-indigo-500 text-slate-100 p-4 flex justify-between">
        Bienvenido {nombre}, Acá vas a poder interactuar con los eventos
        <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
      </div>
      <EventCard {...hardcoded} />
    </div>
  );
}
