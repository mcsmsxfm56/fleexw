import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

interface aceptarORechazarPostulante {
  idPostulante: string;
  statusNuevo: string;
  idEvent: string | string[] | undefined;
  token: string;
}

export const aceptarORechazarPostulante = async ({
  idPostulante,
  statusNuevo,
  idEvent,
  token
}: aceptarORechazarPostulante) => {
  const response = await fetch(`/api/event`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
