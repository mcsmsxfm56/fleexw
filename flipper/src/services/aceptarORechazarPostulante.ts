import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

interface aceptarORechazarPostulante {
  idPostulante: string;
  statusNuevo: string;
  idEvent: string | string[] | undefined;
}

export const aceptarORechazarPostulante = async ({
  idPostulante,
  statusNuevo,
  idEvent,
}: aceptarORechazarPostulante) => {
  const response = await fetch(`/api/event`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventoId: idEvent,
      trabajadorId: idPostulante,
      status: statusNuevo,
      realmethod: "PUT",
    }),
  })
    .then((response) => response.text())
    .catch((error) => error.message);
  return alert(response);
};
