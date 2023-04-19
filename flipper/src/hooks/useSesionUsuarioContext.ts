import { SesionUsuarioContext } from "@/context/SesionUsuarioContext";
import { useContext, useState } from "react";
import { iniciarSesion } from "@/services/iniciarSesion";

export const useSesionUsuarioContext = () => {
    const {        
        rol,
        token,
        nombre,
        setRol, 
        setToken,
        setNombre
    } = useContext(SesionUsuarioContext)

    const [error, setError] = useState(true)

    const login = async (email: string, password: string) => {
        try {
            const usuarioActual = await iniciarSesion({email,password})

            window.localStorage.setItem('rol', usuarioActual.rol)
            window.localStorage.setItem('token', usuarioActual.token)
            window.localStorage.setItem('nombre', usuarioActual.nombre)
            setError(false)
            setRol(usuarioActual.rol)
            setToken(usuarioActual.token)
            setNombre(usuarioActual.nombre)
        } catch (error) {
            console.log(error);
        }
        

        /* .then(res => {
            window.localStorage.setItem('rol', res.rol)
            window.localStorage.setItem('token', res.token)
            setRol(res.rol)
            setToken(res.token)
            setError(false)
        })
        .catch(err => console.log(err);
        ) */
       /*
        setRol()
        setToken()
         */
    }

    const logout = () => {
        window.localStorage.removeItem('rol')
        window.localStorage.removeItem('token')
        setRol("")
        setToken("")
    } // se va a usar para desloguearse al apretar un link(con func de boton) en el header o navBar

    return ({
        isLogged: Boolean(token), 
        login,
        logout,
        hasLoginError: error
    })
}