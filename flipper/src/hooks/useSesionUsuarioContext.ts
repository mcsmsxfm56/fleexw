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

    const [error, setError] = useState(false)

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
            setError(true)
            console.log(error);
        }       
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