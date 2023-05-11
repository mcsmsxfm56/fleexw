import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

export const cambiarContrasena = async (
  resetContrasenaCode: string,
  password: string
) => {
  const { token } = useSesionUsuarioContext();
  const response = fetch(`/api/users/gestionDeContrasena/cambiarContrasena/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      resetContrasenaCode,
      password,
      realmethod: "PUT",
    }),
  }).then((res) => res.json());
  return response;
};
