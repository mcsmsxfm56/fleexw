import React from 'react'
import { ShowElements } from '@/types/Types'
import { BotonesDePestañasDelMenu } from '@/utils/BotonesDePestañasDelMenu'

interface Props {
    setShowElements: React.Dispatch<React.SetStateAction<ShowElements>>
}

const ListaDePestañasDelMenu = ({ setShowElements }: Props) => {

    const handleShowElements = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const idButton = (ev.target as HTMLButtonElement).id
        setShowElements({
            showEventos: idButton === "Mis Eventos" ? true : false,
            showHistorial: idButton === "Historial" ? true : false,
            showCrear: idButton === "Crear Evento" ? true : false,
            showPostulaciones: idButton === "Ver Postulaciones" ? true : false,
            showPerfil: idButton === "Perfil" ? true : false,
        })
    }
    return (
        <ul className={"px-4 md:mt-8 flex flex-col gap-8 items-start border-black rounded transition-all"}>
            {
                BotonesDePestañasDelMenu.map(pestaña => {
                    return (
                        <li className='w-full' key={pestaña}>
                            <button id={pestaña} className={"w-full block text-[#0c0019]"}
                                onClick={handleShowElements}>{pestaña}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ListaDePestañasDelMenu