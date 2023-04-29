import React, { Dispatch, SetStateAction, useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { MenuContext } from "@/context/MenuContext";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import ListaDePestanasDelMenu from "./ListaDePestanasDelMenu";
import perfilProvisorio from "../../assets/images/imagenPerfilProvisoria.png";
import { ShowElements } from "@/types/Types";

interface Props {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ isExpanded, setIsExpanded }: Props) => {
  const { logout, nombre } = useSesionUsuarioContext();
  const { setShowElements } = useContext(MenuContext);

  return (
    <div
      className={
        !isExpanded
          ? "h-full md:w-1/4 lg:w-[250px] md:pt-20 2xl:h-screen fixed md:block top-0 md:top-0 -left-60 md:left-0 bottom-0 bg-indigo-600 lg:pt-20 flex flex-col gap-4 transition-[left] md:transition-none duration-500 ease-out z-40"
          : "h-screen 2xl:h-screen bg-indigo-600 items-center px-4 top-0 md:top-[64px] left-0 flex flex-col justify-center gap-8 transition-[left] md:transition-none duration-500 ease-out z-40 fixed"
      }>
      <div className="avatar flex flex-col items-center justify-start gap-2">
        <div className="w-20 rounded-full ">
          <Image src={perfilProvisorio} alt="Picture of the author" />
        </div>
        <p
          className={
            "w-full block text-white capitalize font-bold text-2xl text-center md:mt-0"
          }>
          {nombre}
        </p>
      </div>
      <ListaDePestanasDelMenu
        setShowElements={setShowElements}
        setIsExpanded={() => setIsExpanded(false)}
      />
      <div className="flex flex-col gap-4 mt-4 border-r-2 border-indigo-600">
        <div className="flex justify-between">
          <Link
            href=""
            className={
              "pl-4 text-indigo-600 font-bold p-2 bg-[#e5e7eb] w-full h-full border-2 border-[#e5e7eb] focus:bg-indigo-600 focus:text-white focus:border-2 focus:border-white hover:bg-indigo-600 hover:text-white transition duration-500"
            }>
            Boton de Ayuda
          </Link>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-help w-full bg-[#e5e7eb] h-full mr-2"
              width="44"
              height="30"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={"#4B39EF"}
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="17" x2="12" y2="17.01" />
              <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
            </svg>
          </div>
        </div>
        <div className="flex justify-between w-full h-full">
          <button
            type="button"
            className={
              "text-left text-indigo-600 font-bold p-2 bg-[#e5e7eb] pl-4 w-full h-full border-2 border-[#e5e7eb] focus:bg-indigo-600 focus:text-white focus:border-2 focus:border-white hover:bg-indigo-600 hover:text-white transition duration-500"
            }
            onClick={() => logout()}>
            Cerrar Sesión
          </button>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-logout h-full w-full bg-[#e5e7eb]"
              width="44"
              height="30"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#4B39EF"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

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
