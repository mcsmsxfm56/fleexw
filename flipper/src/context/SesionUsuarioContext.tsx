
'use client'

import { Dispatch, SetStateAction, createContext, useState, useEffect } from "react";

///////////////////////// context ////////////////////
interface Sesion {
    rol: string,
    token: string,
    nombre: string,
}

interface ContextProps {
    rol: string,
    token: string,
    nombre: string,
    setRol: Dispatch<SetStateAction<Sesion["rol"]>>
    setToken: Dispatch<SetStateAction<Sesion["token"]>>
    setNombre: Dispatch<SetStateAction<Sesion["nombre"]>>
}

  interface propsProvider {
    children: JSX.Element | JSX.Element[]
}

export const SesionUsuarioContext = createContext<ContextProps>({
  rol: "",
  token: "",
  nombre: "",
  setRol: (): string => "",
  setToken: (): string => "",
  setNombre: (): string => ""
})


export const SesionUsuarioProvider = ({children}: propsProvider) => {
  
  
  const [rol, setRol] =  useState("") 
  const [token, setToken] =  useState("")
  const [nombre, setNombre] =  useState("")

  //aca tengo que usar un useEffect para que reconozca que estoy del lado del cliente y asi poder acceder al objeto window
  useEffect (()=>{
    console.log(window.localStorage.getItem('rol'));
    console.log(window.localStorage.getItem('token'));
    console.log(window.localStorage.getItem('nombre'));
    
    setRol(() => window.localStorage.getItem('rol') || "")
    setToken(() => window.localStorage.getItem('token') || "")
    setNombre(() => window.localStorage.getItem('nombre') || "")
  }, [])

  return(
   <SesionUsuarioContext.Provider value={{rol, token, nombre, setRol, setToken, setNombre}}>
     {children}
   </SesionUsuarioContext.Provider>
  )
}

