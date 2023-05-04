import axios from "axios"


export const recuperarContrasena = (email: string) => {
    console.log("email", email);

    return axios({
        method: "put",
        url: `/api/users/gestionDeContrasena/recuperarContrasena`,
        data: {
            email,
            realmethod: "GET",
        },
    })
        .then(response => response.data)
}