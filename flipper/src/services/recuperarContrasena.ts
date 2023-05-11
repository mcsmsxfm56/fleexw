import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

export const recuperarContrasena = (email: string) => {
  console.log("email", email);
  const { token } = useSesionUsuarioContext();
  return fetch(`/api/users/gestionDeContrasena/recuperarContrasena`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      realmethod: "GET",
    }),
  }).then((res) => res.json());
};
