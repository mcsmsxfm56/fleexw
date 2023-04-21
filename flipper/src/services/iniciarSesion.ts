//aca se hace la request para iniciar sesion y el resultado favorable va al localStorage para ser consumido por el context

import axios from "axios"


const URL= "http://localhost:3000"

interface UsuarioParaLoguear {
    email: string,
    password: string
}

type UsuarioLogueado = {
    rol: string, 
    token: string,
    nombre: string
} 

export function iniciarSesion(usuario: UsuarioParaLoguear): Promise<UsuarioLogueado> {
    //request con axios para obtener el usuario
    return axios.post(`${URL}/api/users/login`, usuario ).then(response => response.data)
        /* const usuarioLogueado: UsuarioLogueado = {
            rol: response.data.rol,
            token: response.data.token,
            nombre: response.data.nombre
        }  */       
  
}


