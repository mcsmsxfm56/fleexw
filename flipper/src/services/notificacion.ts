export async function set_Ver_Notificación(
  trabajadorId: string,
  eventoId: string,
  notificacionVista: boolean
) {
  return fetch("/api/notificaciones", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trabajadorId,
      eventoId,
      notificacionVista,
    }),
  }).then((res) => res.json());
}
