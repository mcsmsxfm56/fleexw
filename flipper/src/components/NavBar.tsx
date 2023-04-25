import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext';
import React, { useState } from 'react'
import Menu from './Menu';
import { ShowElements } from '@/types/Types';
interface Props {
    showElements: ShowElements
    setShowElements: React.Dispatch<React.SetStateAction<ShowElements>>
}

const NavBar = ({ showElements, setShowElements }: Props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <nav className="navbar relative bg-indigo-600">
            <div className="flex-none">
                <button className="btn btn-square btn-sm btn-ghost md:hidden" onClick={() => setIsExpanded(!isExpanded)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-7 h-7 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Eventos</a>
            </div>
            <Menu
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                showElements={showElements}
                setShowElements={setShowElements}
            />
        </nav>
    )
}

export default NavBar