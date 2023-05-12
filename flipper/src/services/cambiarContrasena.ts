export const cambiarContrasena = async (
  resetContrasenaCode: string,
  password: string,
) => {
  /*   console.log(resetContrasenaCode, password); */


  const response = fetch(`/api/users/gestionDeContrasena/cambiarContrasena/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resetContrasenaCode,
      password,
      realmethod: "PUT",
    }),
  }).then((res) => res.json());
  return response;
};
