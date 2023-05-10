import ListaEventos from "./ListaDeEventos";
import useSWR, { Fetcher } from "swr";
import React, { useState } from "react";
import Link from "next/link";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

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
const Eventos: React.FC = () => {

  const { id, rol, isAdmin } = useSesionUsuarioContext()

  const fetcherEmpresa: Fetcher<any, string> = (apiRoute) => {
    return fetch(apiRoute, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        realmethod: "GET",
        idEmpresa: id,
        function: 'misEventos'
      }),
    }).then((res) => res.json());
  };

  const fetcherTrabajador: Fetcher<any, string> = (apiRoute) => {
    return fetch(apiRoute).then((res) => res.json());
  };

  if (rol === "trabajador") {
    var { isLoading, error, data } = useSWR("/api/event", fetcherTrabajador);
  }
  if (rol === "empresa") {
    var { isLoading, error, data } = useSWR("/api/empresa", fetcherEmpresa);
  }

  const [order, setOrder] = useState<Ordering>("desc");
  React.useEffect(() => {
    ordering(order);
  }, [order, data]);

  const ordering = (order: Ordering) => {
    function orderDesc(a: evento, b: evento) {
      if (a.fecha_inicio < b.fecha_inicio) return -1;
      if (a.fecha_inicio > b.fecha_inicio) return 1;
      return 0;
    }

    function orderAsc(a: evento, b: evento) {
      if (a.fecha_inicio < b.fecha_inicio) return 1;
      if (a.fecha_inicio > b.fecha_inicio) return -1;
      return 0;
    }

    let sorted: any = [];
    if (
      order == "asc" &&
      isLoading === false &&
      data.constructor.name === "Object"
    ) {
      sorted = data.eventos?.sort(orderAsc);
    } else if (
      order == "desc" &&
      isLoading === false &&
      data.constructor.name === "Object"
    ) {
      sorted = data.eventos?.sort(orderDesc);
    }
    if (
      order == "asc" &&
      isLoading === false &&
      data.constructor.name === "Array"
    ) {
      sorted = data.sort(orderAsc);
    } else if (
      order == "desc" &&
      isLoading === false &&
      data.constructor.name === "Array"
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
    console.log(error);
    return <div>ERROR</div>;
  }

  return (
    <div className="h-full w-full bg-gray-200 flex flex-col items-center pt-20 md:pt-10">
      <div className="p-2">
        {isAdmin === true ? (
          <button className={buttonStyle + " ml-2"}>
            <Link href="/dashboard">Dashboard</Link>
          </button>
        ) : null}
        <h1 className="text-5xl text-indigo-700 text-center">
          Lista de Eventos
        </h1>
      </div>
      {/* Ordenamiento por fechas */}
      <div className="p-2 text-center ">
        <h2 className="text-2xl text-black my-4">Ordenar eventos por Fecha</h2>
        <div className="flex justify-center">
          <button className={buttonStyle} onClick={() => setOrder("asc")}>
            Más cercanos
          </button>
          <button
            className={buttonStyle + " ml-2"}
            onClick={() => setOrder("desc")}
          >
            Más lejanos
          </button>
        </div>
      </div>
      <div className="p-2 flex justify-center w-11/12">
        <ListaEventos eventos={Array.isArray(data) ? data : data?.eventos} />
      </div>
    </div>
  );
};

export default Eventos;
