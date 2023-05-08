import {
  objtrabajadoresEnEventosIncludeEvento,
  objEvento,
} from "@/types/Types";
import { downloadExcelNoAdmin } from "../Excel/generateExcel";
import ListaEventosTrabajador from "../ListaDeEventos/ListaEventosTrabajador";
import useSWR, { Fetcher } from "swr";

const buttonStyle =
  "btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC]";

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
      className="h-full w-full bg-gray-200"
    >
      <div className="p-2">
        <h1 className="text-5xl mt-20 md:mt-10 text-indigo-700 text-center">
          Historial de eventos
        </h1>

        <div className="flex flex-col items-center m-auto w-11/12">
          {!data ? (
            <h2>Todavia no posee eventos confirmados</h2>
          ) : (
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  downloadExcelNoAdmin(eventosExcel);
                }}
                className={buttonStyle + " my-4 bg-green-700"}
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
