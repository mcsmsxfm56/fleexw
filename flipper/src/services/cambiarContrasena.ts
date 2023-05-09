import axios from "axios"


export const cambiarContrasena = async (resetContrasenaCode: string, password: string) => {
    const response = await axios({
        method: "put",
        url: `/api/users/gestionDeContrasena/cambiarContrasena/`,
        data: {
            resetContrasenaCode,
            password,
            realmethod: "PUT",
        },
    })
    return response.data
}
