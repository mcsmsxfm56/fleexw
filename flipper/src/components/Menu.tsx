import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { FaArrowLeft } from 'react-icons/fa'
import perfilProvisorio from "../assets/images/imagenPerfilProvisoria.png"

interface Props {
    isExpanded: boolean,
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({ isExpanded, setIsExpanded }: Props) => {
    const { logout, nombre } = useSesionUsuarioContext()
    return (
        <div className={!isExpanded ?
            "h-screen md:w-1/5 lg:w-[250px] absolute top-0 md:top-[64px] -left-36 md:left-0 bottom-0 bg-gray-100 flex flex-col transition-[left] md:transition-none duration-500 ease-out" :
            "h-screen absolute bg-gray-100 top-0 md:top-[64px] left-0 flex flex-col transition-[left] md:transition-none duration-500 ease-out"}>

            <IconContext.Provider value={{ color: "#3F3F3F", size: "1.5em", className: "global-class-name" }}>
                <button className="mt-5 mb-8 md:hidden" onClick={() => setIsExpanded(!isExpanded)}>
                    <FaArrowLeft />
                </button>
            </IconContext.Provider>

            <ul className={"px-4 md:mt-8 flex flex-col gap-8 items-start border-black rounded transition-all"}>
                <li className='w-full flex justify-center'>
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <Image src={perfilProvisorio} alt="Picture of the author" />
                        </div>
                    </div>
                </li>
                <li className='w-full text-center'>
                    <span className={"w-full block text-[#0c0019]"}>{nombre}</span>
                </li>
                <li className='w-full'>
                    <Link href="" className={"w-full block text-[#0c0019]"}>Mis Eventos</Link>
                </li>
                <li className='w-full'>
                    <Link href="" className={"w-full block text-[#0c0019]"}>Historial</Link>
                </li>
                <li className='w-full'>
                    <Link href="" className={"w-full block text-[#0c0019]"}>Crear</Link>
                </li>
                <li className='w-full'>
                    <Link href="" className={"w-full block text-[#0c0019]"}>Confirmar</Link>
                </li>
                <li className='w-full'>
                    <Link href="" className={"w-full block text-[#0c0019]"}>Perfil</Link>
                </li>
                <li className='w-full'>
                    <Link href="" className={"w-full block text-[#0c0019]"}>Boton de Ayuda</Link>
                </li>
                <li className='w-full'>
                    <button className={"w-full blockx] text-[#0c0019]"} onClick={() => logout()}>Salir</button>
                </li>
            </ul>
        </div>
    )
}

export default Menu