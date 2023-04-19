
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { SesionUsuarioProvider } from '@/context/SesionUsuarioContext'


export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <SesionUsuarioProvider>
      <Component {...pageProps} />
    </SesionUsuarioProvider>
    )
}
