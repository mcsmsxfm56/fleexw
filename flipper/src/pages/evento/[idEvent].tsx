import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import NavBar from '@/components/NavBar'
import { traerEventoYPostulantes } from '@/services/traerEventoYPostulantes'
import { DetalleEvento } from '../../types/Types';
import Link from 'next/link';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons'



const EventDatail = () => {
    const router = useRouter()
    const [eventDetail, setEventDetail] = useState<DetalleEvento | null>(null)



    const { idEvent } = router.query

    useEffect(() => {
        traerEventoYPostulantes(idEvent as string)
            .then(data => {
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
            <div className='flex flex-col justify-center items-center '>

                {
                    eventDetail?.trabajadores?.map((trabajadorPorEvento) => {
                        const idPostulante = trabajadorPorEvento.trabajadorId
                        if (trabajadorPorEvento.status === "PENDIENTE") return (
                            <>
                                <p>Pendientes:</p>
                                <ul>
                                    <li>
                                        <div className='flex'>
                                            <div>
                                                <Link href={`/postulaciones/${idPostulante}`} className='text-[#605BDC]'>{trabajadorPorEvento.trabajadores.name}</Link>
                                                <p>Perfil:
                                                    <span>Ejemplo hardcodeado</span>
                                                </p>
                                            </div>
                                            <div className='min-w-[250px] flex justify-center gap-8 '>
                                                <IconContext.Provider
                                                    value={{
                                                        color: "red",
                                                        size: "1.5em",
                                                        className: "global-class-name",
                                                    }}
                                                >
                                                    <button >
                                                        <BsXCircleFill />
                                                    </button>
                                                </IconContext.Provider>
                                                <IconContext.Provider
                                                    value={{
                                                        color: "green",
                                                        size: "1.5em",
                                                        className: "global-class-name",
                                                    }}
                                                >
                                                    <button >
                                                        <BsCheckCircleFill />
                                                    </button>
                                                </IconContext.Provider>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        )
                        if (trabajadorPorEvento.status === "RECHAZADO") return (
                            <>
                                <p>Rechazado:</p>
                                <ul>
                                    <li>
                                        <div className='flex'>
                                            <div>
                                                <Link href={`/postulaciones/${idPostulante}`} className='text-[#605BDC]'>{trabajadorPorEvento.trabajadores.name}</Link>
                                                <p>Perfil:
                                                    <span>Ejemplo hardcodeado</span>
                                                </p>
                                            </div>
                                            <div className='min-w-[250px] flex justify-center gap-8 '>
                                                <IconContext.Provider
                                                    value={{
                                                        color: "red",
                                                        size: "1.5em",
                                                        className: "global-class-name",
                                                    }}
                                                >
                                                    <button >
                                                        <BsXCircleFill />
                                                    </button>
                                                </IconContext.Provider>
                                                <IconContext.Provider
                                                    value={{
                                                        color: "green",
                                                        size: "1.5em",
                                                        className: "global-class-name",
                                                    }}
                                                >
                                                    <button >
                                                        <BsCheckCircleFill />
                                                    </button>
                                                </IconContext.Provider>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        )
                        return (
                            <>
                                <p>Aprobado:</p>
                                <ul>
                                    <li>
                                        <div className='flex'>
                                            <div>
                                                <Link href={`/postulaciones/${idPostulante}`} className='text-[#605BDC]'>{trabajadorPorEvento.trabajadores.name}</Link>
                                                <p>Perfil:
                                                    <span>Ejemplo hardcodeado</span>
                                                </p>
                                            </div>
                                            <div className='min-w-[250px] flex justify-center gap-8 '>
                                                <IconContext.Provider
                                                    value={{
                                                        color: "red",
                                                        size: "1.5em",
                                                        className: "global-class-name",
                                                    }}
                                                >
                                                    <button >
                                                        <BsXCircleFill />
                                                    </button>
                                                </IconContext.Provider>
                                                <IconContext.Provider
                                                    value={{
                                                        color: "green",
                                                        size: "1.5em",
                                                        className: "global-class-name",
                                                    }}
                                                >
                                                    <button >
                                                        <BsCheckCircleFill />
                                                    </button>
                                                </IconContext.Provider>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        )
                    })
                }

            </div>
        </div>


    )
}

export default EventDatail