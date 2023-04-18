import React, { createContext, useContext } from "react"
import { UsuarioLogueado } from "@/types/types"
//aca se hace la request para iniciar sesion y va al context
interface UsuarioParaLoguear {
    correo: string,
    contraseña: string
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


