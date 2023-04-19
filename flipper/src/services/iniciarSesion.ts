//aca se hace la request para iniciar sesion y el resultado favorable va al localStorage para ser consumido por el context

import axios from "axios"

const URL="http://localhost:3000/"

interface UsuarioParaLoguear {
    email: string,
    password: string
}

type UsuarioLogueado = {
    rol: string, 
    token: string,
    nombre: string
} 

/* 
const usuarioLogueado = {
        rol:"trabajador",
        token: "fsdfsdf5.45645465.fsdfs"
    } */

export async function iniciarSesion(usuario: UsuarioParaLoguear): Promise<UsuarioLogueado> {
    //request con axios para obtener el usuario
    try {
        const response = await axios.post(`${URL}api/users/login`, usuario )
        const usuarioLogueado: UsuarioLogueado = {
            rol: response.data.rol,
            token: response.data.token,
            nombre: response.data.nombre
        }        
        return usuarioLogueado
    } catch (error) {
        console.log(error);
    }
    

    /* .then(res => {
        const {rol, token, nombre} = res.data
        return {rol, token, nombre}
    })
    .catch(error => error)  */
}


