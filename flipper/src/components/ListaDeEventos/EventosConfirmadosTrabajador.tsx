import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext"
import { useEffect, useState } from "react"
import axios from 'axios'
import ListaEventosTrabajador from "./ListaEventosTrabajador"
import { data } from "autoprefixer"

const EventosConfirmadosTrabajador = () => {
    const { id } = useSesionUsuarioContext()
    const [dataEvento, setDataEvento] = useState<[]>()


    const getEventos = async () => {
        const eventos = await axios(
            {
                method: 'put',
                url: `/api/trabajadoreseneventos`,
                data: {
                    trabajadorId: id,
                    realmethod: "GET"
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
            className="h-screen w-screen bg-gray-200"
        >
            <div className="p-2">
                <h1 className="text-5xl mt-4 pt-14 text-indigo-700 lg:text-center 2xl:text-center">
                    Eventos Confirmados
                </h1>

                <div className="p-2 lg:flex lg:justify-center">

                    {!dataEvento
                        ? <h2>Todavia no posee eventos confirmados</h2>
                        : <ListaEventosTrabajador funcionalidad='confirmados' eventos={dataEvento} />
                    }
                </div>

            </div>
        </div>
    )
}

export default EventosConfirmadosTrabajador