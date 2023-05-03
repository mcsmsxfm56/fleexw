import { NotificationList } from "@/types/Types";
import axios, { AxiosError } from "axios";

export async function set_Ver_Notificación(trabajadorId: string, eventoId: string, notificacionVista: boolean) {
  return axios({
    method: 'put',
    url: '/api/notificaciones',
    data: {
      trabajadorId,
      eventoId,
      notificacionVista,
    }
  }).then(response => {
    console.log(response.data)
  })
}