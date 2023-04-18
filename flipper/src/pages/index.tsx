//landing page
import Link from 'next/link'
import React, { useState } from 'react'
import { iniciarSesion } from '@/services/iniciarSesion'

function LogIn() {
  const [usuario, setUsuario] = useState({
    correo: "",
    contraseña: ""
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name
    const value = evt.target.value    
    setUsuario({...usuario, [name]: value} )
  }

  const handleLogIn = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    iniciarSesion(usuario)
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
            <Link href="">
              Crear una cuenta
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LogIn

