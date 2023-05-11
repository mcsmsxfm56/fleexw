import { NotificationList } from "@/types/Types";

export async function Get_Postulaciones_Trabajador(
  trabajadorId: string,
  token: string
): Promise<NotificationList> {
  //console.log("Token", token);
  return fetch(`/api/trabajadoreseneventos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      trabajadorId,
      realmethod: "GET",
    }),
  }).then((res) => res.json());
}
