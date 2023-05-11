import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { NotificationList } from "@/types/Types";

export async function Get_Postulaciones_Trabajador(
  trabajadorId: string
): Promise<NotificationList> {
  const { token } = useSesionUsuarioContext();
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
