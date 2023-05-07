import { SesionUsuarioContext } from "@/context/SesionUsuarioContext";
import { useContext, useState } from "react";
import { iniciarSesion } from "@/services/iniciarSesion";
import { useRouter } from "next/router";

export const useSesionUsuarioContext = () => {
  const { rol, token, nombre, id, setRol, setToken, setNombre, setId } =
    useContext(SesionUsuarioContext);

  const [error, setError] = useState<any>();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      /*  const usuarioData =  */
      const usuarioActual = await iniciarSesion({ email, password });
      window.localStorage.setItem("rol", usuarioActual.rol);
      window.localStorage.setItem("token", usuarioActual.token);
      window.localStorage.setItem("nombre", usuarioActual.nombre);
      window.localStorage.setItem("id", usuarioActual.id);
      setError(false);
      setRol(usuarioActual.rol);
      setToken(usuarioActual.token);
      setNombre(usuarioActual.nombre);
      setId(usuarioActual.id);
      router.push("/home");
    } catch (error: any) {
      setError({ status: true, message: error.response.data });
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setRol("");
    setToken("");
    setNombre("");
    setId("");
    router.push("/");
  }; // se va a usar para desloguearse al apretar un link(con func de boton) en el header o navBar

  return {
    id,
    isLogged: Boolean(token),
    login,
    logout,
    nombre,
    hasLoginError: error,
    rol,
    token,
  };
};
