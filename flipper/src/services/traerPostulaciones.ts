import { NotificationList } from "@/types/Types";

export async function Get_Postulaciones_Trabajador(
  trabajadorId: string
): Promise<NotificationList> {
  return fetch(`/api/trabajadoreseneventos`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trabajadorId,
      realmethod: "GET",
    }),
  }).then((res) => res.json());
}
