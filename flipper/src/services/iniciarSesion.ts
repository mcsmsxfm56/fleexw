import React, { createContext, useContext } from "react"
//aca se hace la request para iniciar sesion y va al context
interface UsuarioParaLoguear {
    correo: string,
    contraseña: string
}

interface UsuarioLogueado {
    id: "",
    nombre:"",
    token: ""
}

const usuarioLogueado = {
        id: "adfff-544",
        nombre:"dante",
        token: "fsdfsdf5.45645465.fsdfs"
    }


export function iniciarSesion(usuario: UsuarioParaLoguear) {
    //request con axios para obtener el usuario

    return usuarioLogueado
    
}

///////////////////////// context ////////////////////
type iniciarSesionResultado = ReturnType<typeof iniciarSesion>
const sesionContext = createContext<iniciarSesionResultado>({
    id:"",
    nombre:"",
    token:""
    }
)


/* 
export const sesionProvider: React.FC<{initialSesion: UsuarioLogueado}> = ({initialSesion}) => {
    
} */