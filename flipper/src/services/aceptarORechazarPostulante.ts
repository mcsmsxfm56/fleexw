import axios from "axios"


interface aceptarORechazarPostulante {
    idPostulante: string,
    statusNuevo: string
}


export const aceptarORechazarPostulante = ({ idPostulante, statusNuevo }: aceptarORechazarPostulante) => {
    axios({
        method: 'put',
        url: `/api/event/${idEvent}`,
        data: {
            idPostulante,
            statusNuevo
        }
    })
}