import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { NotificationList } from "@/types/Types";
import axios, { AxiosError } from "axios";

export async function Get_Postulaciones_Trabajador(
  trabajadorId: string
): Promise<NotificationList> {
  return axios({
    method: "put",
    url: `/api/trabajadoreseneventos`,

    data: {
      trabajadorId,
      realmethod: "GET",
    },
  }).then((response) => response.data);
}
