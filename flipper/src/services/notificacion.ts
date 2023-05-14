export async function set_Ver_Notificación(
  trabajadorId: string,
  eventoId: string,
  notificacionVista: boolean,
  token: string
) {
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
