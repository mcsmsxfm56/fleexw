import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { log } from "console";

export default function Home() {
  const {logout, nombre} = useSesionUsuarioContext()

  const handleCerrarSesion = () => {
    logout()
  }
  
  return (
    <div className="bg-indigo-500 text-slate-100 p-4 flex justify-between">
      Bienvenido {nombre}, Acá vas a poder interactuar con los eventos
      <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
    </div>
  );
}