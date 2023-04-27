'use client'

import { Dispatch, SetStateAction, createContext, useState, useEffect } from "react";
import { ShowElements } from '../types/Types';


interface MenuContextProps {
    showElements: ShowElements
    setShowElements: Dispatch<SetStateAction<ShowElements>>
}

export const MenuContext = createContext<MenuContextProps>({} as MenuContextProps)

interface propsProvider {
    children: JSX.Element | JSX.Element[]
}

export const MenuProvider = ({ children }: propsProvider) => {

    const [showElements, setShowElements] = useState({
        showEventos: true,
        showHistorial: false,
        showCrear: false,
        showPostulaciones: false,
        showPerfil: false,
    })

    return (
        <MenuContext.Provider value={{ showElements, setShowElements }}>
            {children}
        </MenuContext.Provider>
    )
}
