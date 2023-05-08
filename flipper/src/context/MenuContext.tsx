'use client'

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ShowElementsEmpresa, ShowElementsTrabajador } from '../types/Types';



interface MenuContextProps {
    showElementsEmpresa: ShowElementsEmpresa
    setShowElementsEmpresa: Dispatch<SetStateAction<ShowElementsEmpresa>>
    showElementsTrabajador: ShowElementsTrabajador
    setShowElementsTrabajador: Dispatch<SetStateAction<ShowElementsTrabajador>>
}

export const MenuContext = createContext<MenuContextProps>({} as MenuContextProps)

interface propsProvider {
    children: JSX.Element | JSX.Element[]
}

export const MenuProvider = ({ children }: propsProvider) => {

    const [showElementsTrabajador, setShowElementsTrabajador] = useState({
        showEventosTrabajador: true,
        showEventosConfirmadosTrabajador: false,
        showPerfilTrabajador: false,
        showHistorialTrabajador: false,
    })
    const [showElementsEmpresa, setShowElementsEmpresa] = useState({
        showEventos: true,
        showHistorial: false,
        showCrear: false,
        showPerfil: false,
    })

    return (
        <MenuContext.Provider
            value={{ showElementsEmpresa, setShowElementsEmpresa, showElementsTrabajador, setShowElementsTrabajador }}
        >
            {children}
        </MenuContext.Provider>
    )
}
