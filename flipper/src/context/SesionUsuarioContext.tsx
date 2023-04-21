
'use client'

import { Dispatch, SetStateAction, createContext, useState, useEffect } from "react";

///////////////////////// context ////////////////////
interface ContextProps {
    rol: string,
    token: string,
    nombre: string,
    setRol: Dispatch<SetStateAction<string>>
    setToken: Dispatch<SetStateAction<string>>
    setNombre: Dispatch<SetStateAction<string>>
}

export const SesionUsuarioContext = createContext<ContextProps>({} as ContextProps) 

interface propsProvider {
  children: JSX.Element | JSX.Element[]
}

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

