import axios from "axios"

interface ResponseAdmitirOrestringirPostulaciones {
    message: string
}

export const admitirOrestringirPostulaciones = (idEvent: string, admitePostulaciones: boolean): Promise<ResponseAdmitirOrestringirPostulaciones> => {
    return axios(
        {
            method: 'put',
            url: `/api/event/admitirOrestringirPostulaciones`,
            data: {
                admitePostulaciones,
                eventoId: idEvent,
                realmethod: "PUT"
            }
        })
        .then(response => response.data)
}