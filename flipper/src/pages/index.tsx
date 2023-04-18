//landing page
'use client'

import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { iniciarSesion } from '@/services/iniciarSesion'
import { useSesionUsuarioContext } from '@/context/SesionUsuarioContext'


function LogIn() {

  const [usuario, setUsuario] = useState({
    correo: "",
    contraseña: ""
  })

  const {id, nombre, token, setId, setNombre, setToken} = useSesionUsuarioContext()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name
    const value = evt.target.value    
    setUsuario({...usuario, [name]: value} )
  }

  const handleLogIn = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const usuarioLogueadoData = iniciarSesion(usuario)
    setId(usuarioLogueadoData.id)
    setNombre(usuarioLogueadoData.nombre)
    setToken(usuarioLogueadoData.token)   
  }

  return (
   
    <div className='min-h-screen flex justify-center items-center'>
      <div className='max-w-xl flex flex-col gap-10'>
        <h1>Inicia Sesión</h1>
        <form 
        className='grid gap-5'
        onSubmit={handleLogIn}>
          <input 
          type="email" 
          name='correo' 
          id="correo" 
          placeholder='Direccion de correo electrónico' 
          value= {usuario.correo} 
          onChange={handleChange}
          required
          />
          <input 
          type="password" 
          name='contraseña' 
          id="contraseña" 
          placeholder='Contraseña' 
          value= {usuario.contraseña}
          onChange={handleChange}
          required/>
          <button className='justify-self-end'>
            Ingresar
          </button>
        </form>
        <div className='flex flex-col'>
          <span>
            ¿Has olvidado tu contraseña? &nbsp;&nbsp; 
            <Link href="">
              Recuperar contraseña
            </Link>
          </span>
          <span>
            ¿No tienes una cuenta? &nbsp;&nbsp; 
            <Link href="/app/register">
              Crear una cuenta
            </Link>
          </span>
        </div>
      </div>
    </div>

  )
}

export default LogIn

