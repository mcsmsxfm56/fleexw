"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import jwt_decode from "jwt-decode";
import { Usuario } from '../types/Types';
import fotoProvisoria from "@/utils/fotoProvisoria";
///////////////////////// context ////////////////////
interface ContextProps {
  id: string;
  rol: string;
  token: string;
  nombre: string;
  isAdmin: boolean;
  foto: string;
  setRol: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
  setNombre: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  setFoto: Dispatch<SetStateAction<string>>;
}

export const SesionUsuarioContext = createContext<ContextProps>(
  {} as ContextProps
);

interface propsProvider {
  children: JSX.Element | JSX.Element[];
}

export const SesionUsuarioProvider = ({ children }: propsProvider) => {
  const [rol, setRol] = useState("");
  const [token, setToken] = useState("");
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [foto, setFoto] = useState(fotoProvisoria);

  //aca tengo que usar un useEffect para que reconozca que estoy del lado del cliente y asi poder acceder al objeto window
  useEffect(() => {

    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("myTokenName="))
      ?.split("=")[1];

    const usuario = cookieValue ? jwt_decode(cookieValue) as Usuario : undefined;
    const foto = usuario?.foto?.split(" ")[1]

    /*  setRol(() => window.localStorage.getItem("rol") || "");
     setToken(() => window.localStorage.getItem("token") || "");
     setNombre(() => window.localStorage.getItem("nombre") || "");
     setId(() => window.localStorage.getItem("id") || ""); */

    setRol(() => usuario?.rol || "")
    setNombre(() => usuario?.nombre || "")
    setId(() => usuario?.id || "")
    setIsAdmin(() => usuario?.isAdmin || false)
    setToken(() => cookieValue || "")
    foto && setFoto(foto)

  }, []);

  return (
    <SesionUsuarioContext.Provider
      value={{
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
        setFoto
      }}
    >
      {children}
    </SesionUsuarioContext.Provider>
  );
};
