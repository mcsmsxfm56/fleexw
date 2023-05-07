import useSWR, { Fetcher } from "swr";
import React, { useState, useEffect } from "react";
import ListaEventosTrabajador from "./ListaDeEventosTrabajador";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import Link from "next/link";

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

//string define el tipado de la url recibida, any el tipado de la respuesta
const fetcherCiudadEventos: Fetcher<any, string> = (apiRoute) => {
  return fetch(apiRoute, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      realmethod: "GET",
      id: localStorage.getItem("id"),
    }),
  }).then((res) => res.json());
};

const EventosTrabajador: React.FC = () => {
  const { id, isAdmin } = useSesionUsuarioContext();

  // Perform localStorage action
  var { isLoading, error, data } = useSWR(
    "/api/trabajador/eventos",
    fetcherCiudadEventos
  );
  const [order, setOrder] = useState<Ordering>("desc");

  useEffect(() => {
    ordering(order);
  }, [order, data]);

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

    let sorted: any = [];
    if (
      order == "asc" &&
      isLoading === false &&
      data?.constructor.name === "Object"
    ) {
      sorted = data.eventos.sort(orderAsc);
    } else if (
      order == "desc" &&
      isLoading === false &&
      data?.constructor.name === "Object"
    ) {
      sorted = data.eventos?.sort(orderDesc);
    }
    if (
      order == "asc" &&
      isLoading === false &&
      data?.constructor.name === "Array"
    ) {
      sorted = data.sort(orderAsc);
    } else if (
      order == "desc" &&
      isLoading === false &&
      data?.constructor.name === "Array"
    ) {
      sorted = data.sort(orderDesc);
    }

    const eventosSorted = {
      ...data,
      eventos: sorted,
    };
    data = eventosSorted;
  };

  if (error) {
    console.log(error.message);
    return (
      <div>
        <p>ERROR</p>
      </div>
    );
  }
  return (
    <div className="h-full w-full bg-gray-200 flex flex-col items-center pt-20 md:pt-10">
      <div className="p-2">
        {isAdmin === true ? <Link href="/dashboard">Dashboard</Link> : null}
        <h1 className="text-5xl text-indigo-700 text-center">
          Lista de Eventos
        </h1>
      </div>
      {/* Ordenamiento por fechas */}
      <div className="p-2 text-center">
        <h2 className="text-2xl text-black my-4">Ordenar eventos por Fecha</h2>
        <div className="flex justify-center">
          <button className={buttonStyle} onClick={() => setOrder("asc")}>
            Ascendente
          </button>
          <button
            className={buttonStyle + " ml-2"}
            onClick={() => setOrder("desc")}
          >
            Descendente
          </button>
        </div>
      </div>
      <div className="p-2 flex justify-center">
        <ListaEventosTrabajador
          eventos={Array.isArray(data) ? data : data?.eventos}
        />
      </div>
    </div>
  );
};

export default EventosTrabajador;
