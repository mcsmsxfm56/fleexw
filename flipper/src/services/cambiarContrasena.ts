import axios from "axios"


export const cambiarContrasena = async (email: string, password: string) => {
    const response = await axios({
        method: "put",
        url: `/api/users/gestionDeContrasena/cambiarContrasena/`,
        data: {
            email,
            password,
            realmethod: "PUT",
        },
    })
    return response.data
}
