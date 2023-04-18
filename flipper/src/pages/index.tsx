//landing page
import Link from 'next/link'
import React from 'react'

function LogIn() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='max-w-xl flex flex-col gap-10'>
        <h1>Inicia Sesión</h1>
        <form className='grid gap-5'>
          <input type="email" name='correo' id="correo" placeholder='Direccion de correo electrónico' required/>
          <input type="password" name='contraseña' id="contraseña" placeholder='Contraseña' required/>
          <button className='justify-self-end'>Ingresar</button>
        </form>
        <div className='flex flex-col'>
          <span>¿Has olvidado tu contraseña? &nbsp;&nbsp; <Link href="">Recuperar contraseña</Link></span>
          <span>¿No tienes una cuenta? &nbsp;&nbsp; <Link href="">Crear una cuenta</Link></span>
        </div>
      </div>
    </div>
  )
}

export default LogIn

