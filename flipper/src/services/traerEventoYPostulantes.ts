import { DetalleEvento } from "../types/Types";

export function traerEventoYPostulantes(
  idEvent: string
): Promise<DetalleEvento> {
  //request con axios para obtener el usuario
  return fetch("/api/event", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventoId: idEvent,
      realmethod: "GET",
    }),
  }).then((res) => res.json());
}
