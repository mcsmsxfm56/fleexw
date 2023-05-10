import useSWR, { Fetcher } from "swr";
import { DetalleEvento } from "../types/Types";

//export function traerEventoYPostulantes(
//idEvent: string
//): Promise<DetalleEvento> {
//request con axios para obtener el usuario
//return fetch("/api/event", {
//method: "PUT",
//headers: { "Content-Type": "application/json" },
//body: JSON.stringify({
//eventoId: idEvent,
//realmethod: "GET",
//}),
//}).then((res) => res.json());
//}

//export
const fetcher: Fetcher<any, string> = (apiRoute) => {
  return fetch(apiRoute, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      realmethod: "GET",
    }),
  }).then((res) => res.json());
};

export function traerEventoYPostulantes(idEvento: any) {
  const { data, error, isLoading } = useSWR(`/api/event/${idEvento}`, fetcher);

  return {
    data,
    isLoading,
    error,
  };
}
