import axios from 'axios';
import { DetalleEvento } from '../types/Types';


export function traerEventoYPostulantes(
    idEvent: string
): Promise<DetalleEvento> {
    //request con axios para obtener el usuario
    return axios(
        {
            method: 'put',
            url: `/api/event`,
            data: {
                eventoId: idEvent,
                realmethod: "GET"
            }
        })
        .then(response => response.data)
}