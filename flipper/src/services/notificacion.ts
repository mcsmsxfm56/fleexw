import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

export async function set_Ver_Notificación(
  trabajadorId: string,
  eventoId: string,
  notificacionVista: boolean
) {
  const { token } = useSesionUsuarioContext();
  return fetch("/api/notificaciones", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      trabajadorId,
      eventoId,
      notificacionVista,
    }),
  }).then((res) => res.json());
}
