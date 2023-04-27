import axios from 'axios';
import { DetalleEvento } from '../types/Types';


export function traerEventoYPostulantes(
    idEvent: string
): Promise<DetalleEvento> {
    //request con axios para obtener el usuario
    return axios.get(`/api/event/${idEvent}`)
        .then(response => response.data)
}