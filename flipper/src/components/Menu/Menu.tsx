import React, { Dispatch, SetStateAction, useContext, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { FaArrowLeft } from 'react-icons/fa'
import { MenuContext } from '@/context/MenuContext'
import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext'
import ListaDePestañasDelMenu from './ListaDePestañasDelMenu'
import perfilProvisorio from "../../assets/images/imagenPerfilProvisoria.png"
import { ShowElements } from '@/types/Types'

interface Props {
  isExpanded: boolean,
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}


const Menu = ({ isExpanded, setIsExpanded }: Props) => {
  const { logout, nombre } = useSesionUsuarioContext()
  const { setShowElements } = useContext(MenuContext)


  return (
    <div
      className={
        !isExpanded
          ? "h-screen md:w-1/5 lg:w-[250px] absolute md:block top-0 md:top-[64px] -left-36 md:left-0 bottom-0 bg-gray-100 flex flex-col justify-center gap-8 transition-[left] md:transition-none duration-500 ease-out"
          : "h-screen absolute bg-gray-100 top-0 md:top-[64px] left-0 flex flex-col justify-center gap-8 transition-[left] md:transition-none duration-500 ease-out"
      }
    >
      <IconContext.Provider
        value={{
          color: "#3F3F3F",
          size: "1.5em",
          className: "global-class-name",
        }}
      >
        <button
          className="mt-5 mb-8 md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FaArrowLeft />
        </button>
      </IconContext.Provider>

      <div className="avatar">
        <div className="w-20 rounded-full">
          <Image src={perfilProvisorio} alt="Picture of the author" />
        </div>
      </div>
      <p className={"w-full block text-[#0c0019]"}>{nombre}</p>

      <ListaDePestañasDelMenu setShowElements={setShowElements} />

      <Link href="" className={"w-full block text-[#0c0019] text-center"}>Boton de Ayuda</Link>
      <button className={"w-full block text-[#0c0019]"} onClick={() => logout()}>Cerrar Sesión</button>
    </div>
  )
}

export default Menu

//MENU OLD
/* 
import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useContext, useRef } from 'react'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { FaArrowLeft } from 'react-icons/fa'
import perfilProvisorio from "../assets/images/imagenPerfilProvisoria.png"
import { ShowElements } from '@/types/Types'
import { MenuContext } from '@/context/MenuContext'

interface Props {
  isExpanded: boolean,
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}


const Menu = ({ isExpanded, setIsExpanded }: Props) => {
  const { logout, nombre } = useSesionUsuarioContext()
  const { setShowElements } = useContext(MenuContext)

  return (
    <div
      className={
        !isExpanded
          ? "h-screen md:w-1/5 lg:w-[250px] absolute md:block top-0 md:top-[64px] -left-36 md:left-0 bottom-0 bg-gray-100 flex flex-col transition-[left] md:transition-none duration-500 ease-out"
          : "h-screen absolute bg-gray-100 top-0 md:top-[64px] left-0 flex flex-col transition-[left] md:transition-none duration-500 ease-out"
      }
    >
      <IconContext.Provider
        value={{
          color: "#3F3F3F",
          size: "1.5em",
          className: "global-class-name",
        }}
      >
        <button
          className="mt-5 mb-8 md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
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
          <button className={"w-full block text-[#0c0019]"}
            onClick={() => {
              setShowElements({
                showEventos: true,
                showHistorial: false,
                showCrear: false,
                showPostulaciones: false,
                showPerfil: false,
              })
            }}>Mis Eventos</button>
        </li>
        <li className='w-full'>
          <button className={"w-full block text-[#0c0019]"}
            onClick={() => {
              setShowElements({
                showEventos: false,
                showHistorial: true,
                showCrear: false,
                showPostulaciones: false,
                showPerfil: false,
              })
            }}>Historial</button>
        </li>
        <li className='w-full'>
          <button className={"w-full block text-[#0c0019]"}
            onClick={() => {
              setShowElements({
                showEventos: false,
                showHistorial: false,
                showCrear: true,
                showPostulaciones: false,
                showPerfil: false,
              })
            }}>Crear</button>
        </li>
        <li className='w-full'>
          <button className={"w-full block text-[#0c0019]"}
            onClick={() => {
              setShowElements({
                showEventos: false,
                showHistorial: false,
                showCrear: false,
                showPostulaciones: true,
                showPerfil: false,
              })
            }}>Postulaciones</button>
        </li>
        <li className='w-full'>
          <button className={"w-full block text-[#0c0019]"}
            onClick={() => {
              setShowElements({
                showEventos: false,
                showHistorial: false,
                showCrear: false,
                showPostulaciones: false,
                showPerfil: true,
              })
            }}>Perfil</button>
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

export default Menu */
