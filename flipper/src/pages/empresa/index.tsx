import ListaEventos from "../../components/ListaDeEventos";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import axios from "axios";
import React, { useState } from "react";

export interface evento {
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
const ListaDeEventos: React.FC = () => {
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
    <section>
      <h1 className="text-6xl">lista de eventos</h1>
      <div>
        <ListaEventos eventos={eventos?.eventos} />
      </div>
    </section>
  );
};

export default ListaDeEventos;
