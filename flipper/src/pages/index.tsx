//landing page
'use client'

import Link from 'next/link'
import React, { useState} from 'react'
import { iniciarSesion } from '@/services/iniciarSesion'
import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext'
import { useRouter } from 'next/router'



function LogIn() {
  const router = useRouter()

  const [usuario, setUsuario] = useState({
    email: "",
    password: ""
  })

  const {login, hasLoginError} = useSesionUsuarioContext()

  //aca va un efecto para redirigir a la pagina home si esta logueado

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name
    const value = evt.target.value    
    setUsuario({...usuario, [name]: value} )
  }

  const handleLogIn = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const {email, password} = usuario
    await login(email, password)
  }

  return (
   
    <div className='min-h-screen flex justify-center items-center'>
      <div className='max-w-xl flex flex-col gap-10'>
        <h1 className='font-bold text-3xl'>Inicia Sesión</h1>

        <form 
        className='grid gap-5'
        onSubmit={handleLogIn}>
          <input 
          type="email" 
          name='email' 
          id="email" 
          placeholder=' Direccion de correo electrónico' 
          value= {usuario.email} 
          onChange={handleChange}
          className='h-10 pl-4 border-2 border-zinc-200 rounded-full'
          required
          />
          <input 
          type="password" 
          name='password' 
          id="password" 
          placeholder=' password' 
          value= {usuario.password}
          onChange={handleChange}
          className='h-10 pl-4 border-2 border-zinc-200 rounded-full'
          required/>
          <button className='justify-self-end bg-indigo-600 text-slate-200 text-2xl font-semibold rounded-md px-6 py-2'>
            Ingresar
          </button>
        </form>

        {hasLoginError && <span className='text-red-500'>Correo o Contraseña no válido</span>}
        
        <div className='flex flex-col'>
          <span className='font-semibold'>
            ¿Has olvidado tu contraseña? &nbsp;&nbsp; 
            <Link href="" className='text-teal-300'>
              Recuperar contraseña
            </Link>
          </span>
          <span className='font-semibold'>
            ¿No tienes una cuenta? &nbsp;&nbsp; 
            <Link href="/app/register" className='text-teal-300'>
              Crear una cuenta
            </Link>
          </span>
        </div>
      </div>
    </div>

  )
}

export default LogIn

