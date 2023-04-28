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

type Ordering = "asc" | "desc";
const buttonStyle =
  "btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC]";

const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<Props>({ eventos: [] });
  const { nombre } = useSesionUsuarioContext();

  const [order, setOrder] = useState<Ordering>("desc");

  const userEvent = async () => {
    await axios
      .get(`/api/empresa/${nombre}`)
      .then((response) => setEventos(response.data))
      .catch((e) => e.message);
  };

  React.useEffect(() => {
    userEvent();
  }, []);

  React.useEffect(() => {
    ordering(order);
  }, [order]);

  const ordering = (order: Ordering) => {
    function orderAsc(a: evento, b: evento) {
      if (a.fecha_inicio < b.fecha_inicio) return -1;
      if (a.fecha_inicio > b.fecha_inicio) return 1;
      return 0;
    }

    function orderDesc(a: evento, b: evento) {
      if (a.fecha_inicio < b.fecha_inicio) return 1;
      if (a.fecha_inicio > b.fecha_inicio) return -1;
      return 0;
    }

    let sorted = [];
    if (order == "asc") {
      sorted = [...eventos.eventos].sort(orderAsc);
    } else {
      sorted = [...eventos.eventos].sort(orderDesc);
    }

    const eventosSorted = {
      ...eventos,
      eventos: sorted,
    };
    setEventos(eventosSorted);
  };

  //console.log(eventos);//toda la info del user empresa, los eventos estan en eventos.eventos
  return (
    <div
      className="h-screen w-full bg-gray-200 md:ml-[10%] lg:ml-[250px]
            lg:w-[calc(100vw-268px)]">
      <div className="p-2">
        <h1 className="text-5xl mt-4 pt-14 text-indigo-700 lg:text-center 2xl:text-center">
          Lista de Eventos
        </h1>
      </div>
      {/* Ordenamiento por fechas */}
      <div className="p-2 lg:text-center 2xl:text-center">
        <h2 className="text-2xl text-black my-4">Ordenar eventos por Fecha</h2>
        <div className="flex lg:justify-center 2xl:justify-center">
          <button className={buttonStyle} onClick={() => setOrder("asc")}>
            Ascendente
          </button>
          <button
            className={buttonStyle + " ml-2"}
            onClick={() => setOrder("desc")}>
            Descendente
          </button>
        </div>
      </div>
      <div className="p-2 lg:flex lg:justify-center">
        <ListaEventos eventos={eventos?.eventos} />
      </div>
    </div>
  );
};

export default Eventos;
