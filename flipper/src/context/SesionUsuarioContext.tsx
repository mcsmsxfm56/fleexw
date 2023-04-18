
'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

///////////////////////// context ////////////////////
interface Sesion {
    id: string,
    nombre: string,
    token: string,
}

interface ContextProps {
    id: string,
    nombre: string,
    token: string,
    setId: Dispatch<SetStateAction<Sesion["id"]>>
    setNombre: Dispatch<SetStateAction<Sesion["nombre"]>>
    setToken: Dispatch<SetStateAction<Sesion["token"]>>
}

const SesionUsuarioContext = createContext<ContextProps>({
  id: "",
  nombre: "",
  token: "",
  setId: (): string => "", 
  setNombre: (): string => "",
  setToken: (): string => "",
})

  
  interface props {
    children: JSX.Element | JSX.Element[]
}

export const SesionUsuarioProvider = ({children}: props) => {
  const [id, setId] =  useState("")
  const [nombre, setNombre] =  useState("")
  const [token, setToken] =  useState("")
  return(
   <SesionUsuarioContext.Provider value={{id:"", nombre:"", token:"", setId, setNombre, setToken}}>
     {children}
   </SesionUsuarioContext.Provider>
  )
}

export const useSesionUsuarioContext = () => useContext(SesionUsuarioContext)