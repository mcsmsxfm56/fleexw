import { SesionUsuarioContext } from "@/context/SesionUsuarioContext";
import { useContext, useState } from "react";
import { iniciarSesion } from "@/services/iniciarSesion";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { Usuario } from "../types/Types";

export const useSesionUsuarioContext = () => {
  const {
    rol,
    token,
    nombre,
    id,
    isAdmin,
    foto,
    setRol,
    setToken,
    setNombre,
    setId,
    setIsAdmin,
    setFoto,
  } = useContext(SesionUsuarioContext);

  const [error, setError] = useState<any>();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    /*  const usuarioData =  */
    /* const usuarioActual =  */
    const response = await iniciarSesion({ email, password });
    if (typeof response === "string") {
      setError({ status: true, message: response });
    } else {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("myTokenName="))
        ?.split("=")[1];

      const usuario = cookieValue
        ? (jwt_decode(cookieValue) as Usuario)
        : undefined;

      const foto = usuario?.foto?.split(" ")[1];
      /*  console.log(typeof foto);
       console.log("foto", foto); */

      setError(false);
      setRol(() => usuario?.rol || "");
      setNombre(() => usuario?.nombre || "");
      setId(() => usuario?.id || "");
      setIsAdmin(() => usuario?.isAdmin || false);
      setToken(() => cookieValue || "");
      foto && setFoto(foto);
      router.push("/home");
    }
    //console.log(iniciarSesion);
    /*  window.localStorage.setItem("rol", usuarioActual.rol);
       let isAdmin;
       if (usuarioActual.isAdmin) {
         isAdmin = "true";
       } else {
         isAdmin = "false";
       }
       window.localStorage.setItem("isAdmin", isAdmin);
       window.localStorage.setItem("token", usuarioActual.token);
       window.localStorage.setItem("nombre", usuarioActual.nombre);
       window.localStorage.setItem("id", usuarioActual.id); */

    /* console.log("cookies", document.cookie.split("=")[1]); */
    /* const token = document.cookie.split("=")[1] */
  };

  const logout = () => {
    /* window.localStorage.clear(); */
    setRol("");
    setToken("");
    setNombre("");
    setId("");
    setIsAdmin(false);
    setFoto("");
    document.cookie = "myTokenName=; max-age=0";
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
    isAdmin,
    foto,
  };
};
