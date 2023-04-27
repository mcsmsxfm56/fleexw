import ListaEventos from "./ListaDeEventos";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Props, string> = (endpoint) =>
  fetch(endpoint).then((res) => res.json());
//Props indica el tipado de la respuesta y string el tipado de endpoint

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
  //const [eventos, setEventos] = useState<Props>({ eventos: [] });
  //const userContext = useSesionUsuarioContext();

  //const [order, setOrder] = useState<Ordering>("desc");
  if (typeof window !== "undefined") {
    // Perform localStorage action
    var sessionName = localStorage.getItem("nombre");
    console.log(sessionName);
    var { data, error, isLoading } = useSWR(
      `/api/empresa/${sessionName}`,
      fetcher
    );
  }
  console.log(data);
  //const userEvent = async () => {
  //const sessionName = localStorage.getItem("nombre");
  //fetch(`api/empresa/${sessionName}`)
  //.then((res) => res.json())
  //.then((response) => {
  // console.log(response);
  //setEventos(response);
  //console.log("useEffect se ejecuta");
  //console.log(eventos);
  //})
  //.catch((e) => e.message);
  //};

  //React.useEffect(() => {
  //userEvent();
  //fetch(`api/empresa/${sessionName}`)
  //.then((res) => res.json())
  //.then((response) => {
  //console.log(response);
  //setEventos(response);
  //console.log("useEffect se ejecuta");
  ///console.log(eventos);
  //});
  //}, []);

  ///React.useEffect(() => {
  //ordering(order);
  //}, [order]);
  /*
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

  console.log(eventos); //toda la info del user empresa, los eventos estan en eventos.eventos
  */
  return (
    <div className="h-screen w-full">
      <div className="p-2 flex items-start">
        <h1 className="text-5xl mb-2 mt-4 text-indigo-700">Lista de Eventos</h1>
      </div>
      {/* Ordenamiento por fechas */}
      <div>
        <h2 className="text-2xl text-black my-4 text-center">
          Ordenar eventos por Fecha
        </h2>
        <div className="flex justify-center">
          <button
            className={buttonStyle}
            onClick={() => {
              //setOrder("asc")
            }}
          >
            Ascendente
          </button>
          <button
            className={buttonStyle + " ml-4"}
            onClick={() => {
              //setOrder("desc")
            }}
          >
            Descendente
          </button>
        </div>
      </div>
      <div className="p-2 max-w-6xl">
        <ListaEventos eventos={data?.eventos} />
      </div>
    </div>
  );
};

export default Eventos;
