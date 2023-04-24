//aca se hace la request para iniciar sesion y el resultado favorable va al localStorage para ser consumido por el context

import axios from "axios";

const URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/";

interface UsuarioParaLoguear {
  email: string;
  password: string;
}

type UsuarioLogueado = {
  id: string,
  rol: string;
  token: string;
  nombre: string;
  error?: unknown;
};

export function iniciarSesion(
  usuario: UsuarioParaLoguear
): Promise<UsuarioLogueado> {
  //request con axios para obtener el usuario
  return axios
    .post(`api/users/login`, usuario)
    .then((response) => response.data);
}
