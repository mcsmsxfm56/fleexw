import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ListaEventosTrabajador from '../ListaDeEventos/ListaEventosTrabajador'

const HistorialTrabajador = () => {
    const { id } = useSesionUsuarioContext()
    const [dataEvento, setDataEvento] = useState<[]>()

    const getEventos = async () => {
        const eventos = await axios(
            {
                method: 'POST',
                url: `/api/trabajadoreseneventos`,
                data: {
                    trabajadorId: id,
                    realmethod: "HISTORIAL"
                }
            })
        setDataEvento(eventos.data)
    }

    useEffect(() => {
        if (id) {
            getEventos()
        }
    }, [])
    return (
        <div
            className="h-screen w-screen bg-gray-200 md:ml-[10%] lg:ml-[250px]
        lg:w-[calc(100vw-268px)]"
        >
            <div className="p-2">
                <h1 className="text-5xl mt-4 pt-14 text-indigo-700 lg:text-center 2xl:text-center">
                    Historial de eventos
                </h1>

                <div className="p-2 lg:flex lg:justify-center">

                    {!dataEvento
                        ? <h2>Todavia no posee eventos confirmados</h2>
                        : <ListaEventosTrabajador eventos={dataEvento} />
                    }
                </div>

            </div>
        </div>
    )
}

export default HistorialTrabajador