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
        if (idEvent) {
            traerEventoYPostulantes(idEvent as string)
                .then(data => {
                    setEventDetail(data)
                })
                .catch(error => console.log(error.message))
        }
    }, [idEvent])

    return (
        <div className='h-screen'>
            <header className="bg-indigo-600 text-slate-100 flex justify-between">
                <NavBar />
            </header>
            <main className="bg-gray-200 md:w-4/5 md:ml-[20%] lg:ml-[250px] 
            lg:w-[calc(100vw-268px)]">
                <div className='flex flex-col justify-center items-center gap-10'>
                    <p className='w-full mt-10 bg-white text-center text-[#4B39EF] font-bold text-xl py-4 -mx-10'>Evento: {eventDetail?.nombre}</p>
                    <div className='flex gap-10'>
                        <div className='flex flex-col'>
                            <p className='text-center font-bold text-xl'>Fecha de Inicio:</p>
                            <p className='text-center font-bold text-lg'>{eventDetail?.fecha_inicio}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-center font-bold text-xl'>Fecha de Finalizacion:</p>
                            <p className='text-center font-bold text-lg'>{eventDetail?.fecha_final}</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-center font-bold text-xl'>Perfiles Solicitados:</p>
                        <p className='text-center font-bold text-lg'> {eventDetail?.perfil}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-center font-bold text-xl'>Ciudad Y Dirección:</p>
                        <p className='text-center font-bold text-lg'>{eventDetail?.lugar}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-center font-bold text-xl'>Observaciones:</p>
                        <p className='text-center font-bold text-lg'>{eventDetail?.observaciones}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <div>
                        <p className="p-4 mt-4 font-bold border-b-2 border-b-indigo-600 text-indigo-600 text-3xl pr-6 pl-6 rounded-sm mb-8">
                            Postulaciones
                        </p>
                    </div>
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
            </main>
        </div>


    )
}

export default EventDatail