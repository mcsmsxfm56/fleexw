import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import NavBar from '@/components/NavBar'


const EventDatail = () => {
    const router = useRouter()
    const [eventDetail, setEventDetail] = useState<any>(null)



    const { idEvent } = router.query

    useEffect(() => {
        axios.get(`/api/event/${idEvent}`)
            .then(response => response.data)
            .then(data => {
                console.log(data.trabajadores[0].trabajadores.name);
                setEventDetail(data)
            })
            .catch(error => console.log(error.message))
    }, [])

    return (
        <div className='h-screen'>
            <NavBar />
            <div className='flex flex-col justify-center items-center '>
                <p>Evento: {eventDetail?.nombre}</p>
                <p>Fecha de Inicio: {eventDetail?.fecha_inicio}</p>
                <p>Fecha de Finalizacion: {eventDetail?.fecha_final}</p>
                <p>Perfil Solicitado: {eventDetail?.perfil}</p>
                <p>Ciudad Y Dirección: {eventDetail?.lugar}</p>
                <p>Observaciones: {eventDetail?.observaciones}</p>
                <p>Postulaciones</p>
            </div>
            <div>
                <p>Pendientes:</p>
                <ul>
                    {
                        eventDetail?.trabajadores?.map((trabajadorPorEvento: any) => {
                            return (
                                <li>
                                    <div>
                                        <p >{trabajadorPorEvento.trabajadores.name}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>


    )
}

export default EventDatail