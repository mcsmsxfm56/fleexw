//aca se hace la request para iniciar sesion y el resultado favorable va al localStorage para ser consumido por el context
interface UsuarioParaLoguear {
  email: string;
  password: string;
}

type UsuarioLogueado = {
  id: string;
  rol: string;
  token: string;
  nombre: string;
  isAdmin: boolean;
  error?: unknown;
};

export function iniciarSesion(
  usuario: UsuarioParaLoguear
): Promise<UsuarioLogueado> {
  //request con axios para obtener el usuario
  return fetch(`api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  }).then((response) => response.json());
}
