import React, { useState } from "react";
import ListaHistorial from "./ListaHistorial";
import { downloadExcelNoAdmin } from "../Excel/generateExcel";
import useSWR from "swr";
import { Fetcher } from "swr";

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
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="h-full bg-gray-200 w-full">
      <div className="p-2 text-center pt-16">
        <h1 className="text-5xl max-sm:text-4xl max-sm:font-bold capitalize mb-2 mt-4 text-indigo-700">
          Historial de Eventos<br></br>
        </h1>
        <button
          onClick={() => {
            downloadExcelNoAdmin(data?.eventos); //espera array de objetos eventos
          }}
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
