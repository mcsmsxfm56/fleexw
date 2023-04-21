import { SesionUsuarioContext } from "@/context/SesionUsuarioContext";
import { useContext, useState } from "react";
import { iniciarSesion } from "@/services/iniciarSesion";
import { useRouter } from "next/router";

type UsuarioLogueado = {
    rol: string, 
    token: string,
    nombre: string
} 
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
    const router = useRouter()
    const login = async (email: string, password: string) => {
        try {
           /*  const usuarioData =  */
            const usuarioActual = await iniciarSesion({email,password})
            window.localStorage.setItem('rol', usuarioActual.rol)
            window.localStorage.setItem('token', usuarioActual.token)
            window.localStorage.setItem('nombre', usuarioActual.nombre)
            setError(false)
            setRol(usuarioActual.rol)
            setToken(usuarioActual.token)
            setNombre(usuarioActual.nombre)
            router.push('/app/home')
        } catch (error) {
            setError(true)
            console.log(error);
        }       
    }

    const logout = () => {
        window.localStorage.clear()
        setRol("")
        setToken("")
        setNombre("")
        router.push('/')
    } // se va a usar para desloguearse al apretar un link(con func de boton) en el header o navBar

    return ({
        isLogged: Boolean(token), 
        login,
        logout,
        nombre,
        hasLoginError: error
    })
}