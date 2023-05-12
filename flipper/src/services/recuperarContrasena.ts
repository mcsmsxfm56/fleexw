
export const recuperarContrasena = (email: string) => {

  return fetch(`/api/users/gestionDeContrasena/recuperarContrasena`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      realmethod: "GET",
    }),
  }).then((res) => res.json());
};
