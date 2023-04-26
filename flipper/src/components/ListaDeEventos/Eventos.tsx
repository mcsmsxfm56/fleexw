import ListaEventos from "./ListaDeEventos";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import axios from "axios";
import React, { useState } from "react";

export interface evento {
  perfil: string;
  nombre: string;
  fecha_inicio: string;
  observaciones: string;
  hora: string;
  lugar: string;
  isDeleted: boolean;
  id: string;
}
export interface Props {
  eventos: evento[];
}
const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<Props>({ eventos: [] });
  const userContext = useSesionUsuarioContext();

  const userEvent = async () => {
    const sessionName = localStorage.getItem("nombre");
    await axios
      .get(`/api/empresa/${sessionName}`)
      .then((response) => setEventos(response.data))
      .catch((e) => e.message);
  };
  React.useEffect(() => {
    userEvent();
  }, []);
  //console.log(eventos);//toda la info del user empresa, los eventos estan en eventos.eventos
  return (
    <div className="h-screen w-full">
      <div className="p-2 flex items-start">
        <h1 className="text-5xl mb-2 mt-4 text-indigo-700">Lista de Eventos</h1>
      </div>
      <div className="p-2 max-w-6xl">
        <ListaEventos eventos={eventos?.eventos} />
      </div>
    </div>
  );
};

export default Eventos;
