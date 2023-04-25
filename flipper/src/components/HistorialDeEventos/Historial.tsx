import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import axios from "axios";
import React, { useState } from "react";
import ListaHistorial from "./ListaHistorial";

export interface evento {
  perfil: string;
  nombre: string;
  fecha_inicio: string;
  observaciones: string;
  hora: string;
  lugar: string;
  isDeleted: boolean;
}
export interface Props {
  eventos: evento[];
}
const Historial: React.FC = () => {
  const [eventos, setEventos] = useState<Props>({ eventos: [] });
  const userContext = useSesionUsuarioContext();

  const userEvent = async () => {
    const sessionName = localStorage.getItem("nombre");
    await axios
      .get(`http://localhost:3000/api/empresa/${sessionName}`)
      .then((response) => setEventos(response.data))
      .catch((e) => e.message);
  };
  React.useEffect(() => {
    userEvent();
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="p-2 flex items-start">
        <h1 className="text-5xl mb-2 mt-4 text-indigo-700">
          Historial de Eventos
        </h1>
      </div>
      <div className="p-2 max-w-6xl">
        <ListaHistorial eventos={eventos?.eventos} />
      </div>
    </div>
  );
};

export default Historial;
