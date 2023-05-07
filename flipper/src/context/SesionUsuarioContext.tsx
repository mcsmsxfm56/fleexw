"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";

///////////////////////// context ////////////////////
interface ContextProps {
  id: string;
  rol: string;
  token: string;
  nombre: string;
  isAdmin: boolean;
  setRol: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
  setNombre: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
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

  //aca tengo que usar un useEffect para que reconozca que estoy del lado del cliente y asi poder acceder al objeto window
  useEffect(() => {
    //console.log(window.localStorage.getItem('rol'));
    //console.log(window.localStorage.getItem('token'));
    //console.log(window.localStorage.getItem('nombre'));

    setRol(() => window.localStorage.getItem("rol") || "");
    setToken(() => window.localStorage.getItem("token") || "");
    setNombre(() => window.localStorage.getItem("nombre") || "");
    setId(() => window.localStorage.getItem("id") || "");
  }, []);

  return (
    <SesionUsuarioContext.Provider
      value={{
        rol,
        token,
        nombre,
        id,
        isAdmin,
        setRol,
        setToken,
        setNombre,
        setId,
        setIsAdmin,
      }}
    >
      {children}
    </SesionUsuarioContext.Provider>
  );
};
