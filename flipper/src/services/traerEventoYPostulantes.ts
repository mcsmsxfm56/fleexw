import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { DetalleEvento } from "../types/Types";

export function traerEventoYPostulantes(
  idEvent: string
): Promise<DetalleEvento> {
  const { token } = useSesionUsuarioContext();
  //request con axios para obtener el usuario
  return fetch("/api/event", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      eventoId: idEvent,
      realmethod: "GET",
    }),
  }).then((res) => res.json());
}
