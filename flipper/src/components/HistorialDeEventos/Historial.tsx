import React, { useEffect, useState } from "react";
import ListaHistorial from "./ListaHistorial";
import { downloadExcelEmpresa } from "../Excel/generateExcel";
import useSWR from "swr";
import { Fetcher } from "swr";
import { objEvento, objtrabajadoresEnEventos } from "@/types/Types";
const buttonStyle =
  "btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC]";

const fetcherGET_api_empresa_id: Fetcher<any, string> = (apiRoute) => {
  return fetch(apiRoute, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      realmethod: "GET",
      idEmpresa: localStorage.getItem("id"),
    }),
  }).then((res) => res.json());
};
const Historial: React.FC = () => {
  const { error, data, isLoading } = useSWR(
    "/api/empresa",
    fetcherGET_api_empresa_id
  );
  data?.eventos.map((objEvento: objEvento) => {
    //nombreTrabajador;
    objEvento.trabajadores?.map((objtrabajadoresEnEventos) => {
      objEvento.nombreTrabajador = objtrabajadoresEnEventos.trabajadores?.name;
      objEvento.status = objtrabajadoresEnEventos.status;
    });
    objEvento.trabajadores?.map((objtrabajadoresEnEventos) => {
      objEvento.telefonotrabajador =
        objtrabajadoresEnEventos.trabajadores?.phone;
    });
    objEvento.lugar;
    objEvento.perfil;
    //lugar;
    //perfil;
    //status;
    delete objEvento.isDeleted;
    delete objEvento.Canceled;
    delete objEvento.admitePostulaciones;
    delete objEvento.id_empresa;
    delete objEvento.cupos;
    delete objEvento.numeroPostulantes;
    //delete objEvento.trabajadores;
  });
  console.log(data?.eventos);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="h-full bg-gray-200 w-full">
      <div className="p-2 text-center">
        <h1 className="text-5xl capitalize mb-2 text-indigo-700 mt-20 md:mt-10">
          Historial de Eventos<br></br>
        </h1>
        <button
          onClick={() => {
            downloadExcelEmpresa(data?.eventos); //espera array de objetos eventos
          }}
          className={buttonStyle + " ml-2"}
        >
          Descargar Excel
        </button>
      </div>
      <div className="p-2 flex justify-center">
        <ListaHistorial eventos={data?.eventos} />
      </div>
    </div>
  );
};

export default Historial;
