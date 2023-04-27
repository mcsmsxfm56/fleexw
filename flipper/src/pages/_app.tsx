
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { SesionUsuarioProvider } from '@/context/SesionUsuarioContext'
import { MenuProvider } from '@/context/MenuContext'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <SesionUsuarioProvider>
      <MenuProvider>
        <Component {...pageProps} />
      </MenuProvider>
    </SesionUsuarioProvider>
  )
}
