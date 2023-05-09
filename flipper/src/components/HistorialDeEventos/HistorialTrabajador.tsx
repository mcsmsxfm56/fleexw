import {
  objtrabajadoresEnEventosIncludeEvento,
  objEvento,
} from "@/types/Types";
import { downloadExcelTrabajador } from "../Excel/generateExcel";
import ListaEventosTrabajador from "../ListaDeEventos/ListaEventosTrabajador";
import useSWR, { Fetcher } from "swr";

const fetcherTrabajador: Fetcher<any, string> = (apiRoute) => {
  return fetch(apiRoute, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      realmethod: "GET",
      trabajadorId: localStorage.getItem("id"),
    }),
  }).then((res) => res.json());
};

const HistorialTrabajador = () => {
  const { isLoading, data, error } = useSWR(
    "/api/trabajadoreseneventos",
    fetcherTrabajador
  );
  const eventosExcel: objEvento[] = [];
  data?.map(
    (
      objtrabajadoresEnEventosIncludeEvento: objtrabajadoresEnEventosIncludeEvento
    ) => {
      eventosExcel.push(objtrabajadoresEnEventosIncludeEvento.evento);
    }
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(data); //array con objtrabajadoresEnEventos

  return (
    <div
      className="h-screen w-screen bg-gray-200 md:ml-[10%] lg:ml-[250px]
        lg:w-[calc(100vw-268px)]"
    >
      <div className="p-2">
        <h1 className="text-5xl mt-4 pt-14 text-indigo-700 lg:text-center 2xl:text-center">
          Historial de eventos
        </h1>

        <div className="p-2 lg:flex lg:justify-center">
          {!data ? (
            <h2>Todavia no posee eventos confirmados</h2>
          ) : (
            <div>
              <button
                onClick={() => {
                  downloadExcelTrabajador(eventosExcel);
                }}
              >
                Descargar Excel
              </button>
              <ListaEventosTrabajador eventos={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialTrabajador;
