import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext';
import React, { useState } from 'react'
import Link from 'next/link';
import Menu from './Menu';

const NavBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <nav className="navbar relative bg-indigo-600">
                <div className="flex-none">
                    <button className="btn btn-square btn-sm btn-ghost" onClick={() => setIsExpanded(!isExpanded)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-7 h-7 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Eventos</a>
                </div>

                {/*                        --------componente menu----------                           */}
                <Menu isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                {/*                        --------componente menu----------                           */}

            </nav>
        </>
    )
}

export default NavBar