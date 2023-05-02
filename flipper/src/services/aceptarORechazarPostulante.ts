import axios from "axios";

interface aceptarORechazarPostulante {
  idPostulante: string;
  statusNuevo: string;
  idEvent: string | string[] | undefined;
}

export const aceptarORechazarPostulante = ({
  idPostulante,
  statusNuevo,
  idEvent,
}: aceptarORechazarPostulante) => {
  axios({
    method: "put",
    url: `/api/event`,
    data: {
      eventoId: idEvent,
      trabajadorId: idPostulante,
      status: statusNuevo,
      realmethod: "PUT",
    },
  })
    .then((response) => alert(response.data))
    .catch((error) => error.message);
};
