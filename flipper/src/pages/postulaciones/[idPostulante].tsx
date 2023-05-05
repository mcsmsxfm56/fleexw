import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'



interface Postulante {
  name: string
  ciudad: string
  direccion: string
  email: string
  phone: string
  genero: string
  edad: string
  estatura: string
  grupo_sanguineo: string
  talla_camiseta: string
  idType: string
  idNumber: number
  nacimiento: string
  foto: string
  cv: string,
  certificado_bancario: string,
  rut: string,
}

function DetallePostulado() {
  const [trabajador, setTrabajador] = useState<Postulante>()
  const route = useRouter()
  const { idPostulante } = route.query
  // console.log(idPostulante)

  const getPostulante = async () => {
    const eventos = await axios(
      {
        method: 'PUT',
        url: `/api/trabajador`,
        data: {
          id: idPostulante,
          realmethod: "GET"
        }
      })
    setTrabajador(eventos.data)
  }

  useEffect(() => {
    if (idPostulante) getPostulante()

  }, [idPostulante])
  // const getData = async (id: string) => {
  //   await axios
  //     .get(`http://localhost:3000/api/trabajador/${id}`)
  //     .then((response) => setTrabajador(response.data))
  //     .catch((e) => e.message);
  // }

  // useEffect(() => {
  //   if (idPostulante) {
  //     getData(idPostulante as string)
  //   }
  // }, [idPostulante])

  const styles = {
    input: 'font-mono text text-3xl text-black capitalize'
  }

  const titleStyle = 'font-mono text-xl text-black'
  const categoriStyle = 'font-mono text-base underline uppercase font-bold text-black'
  const dataStyle = 'font-mono text-base text-black'
  const section = 'bg-gray-300 p-2 items-start mx-5 lg:w-auto'
  const centroPantalla = 'flex justify-center items-center h-screen'

  return (
    <div className='flex justify-center items-center h-screen '>

      <div className=" md:w-2/4 md:flex bg-[#D9D9D9] border-2 rounded-3xl border-[#4B39EF] divide-solid  ">
        <div className="flex flex-col items-center mx-auto ">
          <div>
            <img className="w-32 rounded-full" src={trabajador?.foto} alt="Picture of the author" />
            <h3 className={styles.input}>{trabajador?.name}</h3>
          </div>


          <div className='flex-col justify-center items-center lg:w-96'>
            <div className='flex justify-center my-1'>
              <h4 className={categoriStyle}>Información de contacto</h4>
            </div>
            <div className={section} >
              <h5 className={dataStyle} >Ciudad: {trabajador?.ciudad ?? '-'} </h5>
              <h5 className={dataStyle} >Direccion: {trabajador?.direccion ?? '-'} </h5>
              <h5 className={dataStyle} >Email: {trabajador?.email ?? '-'}</h5>
              <h5 className={dataStyle} >Teléfono:{trabajador?.phone ?? '-'} </h5>
            </div>
            <div className='flex justify-center my-1'>
              <h4 className='font-mono text-base underline uppercase font-bold text-black '>Información Personal</h4>
            </div>
            <div className={section}>
              <h5 className={dataStyle} >Género:{trabajador?.genero ?? '-'} </h5>
              <h5 className={dataStyle} >Edad: {trabajador?.edad ?? '-'} </h5>
              <h5 className={dataStyle} >Estatura: {trabajador?.estatura ?? '-'}</h5>
              <h5 className={dataStyle} >Grupo Sanguíneo: {trabajador?.grupo_sanguineo ?? '-'} </h5>
              <h5 className={dataStyle} >Talle de camisa: {trabajador?.talla_camiseta ?? '-'} </h5>
              <h5 className={dataStyle} >Tipo de identificación: {trabajador?.idType ?? '-'} </h5>
              <h5 className={dataStyle} >Identificacion: {trabajador?.idNumber ?? '-'} </h5>
            </div>
          </div>
          <div className='flex justify-between m-4 md:mx-10'>
            <button onClick={() => alert('Esta funcion todavia no está disponible')} className="btn btn-primary btn-sm md:btn-md mx-1">Descargar</button>
            <button onClick={() => route.back()} className="btn btn-primary btn-sm md:btn-md">Volver</button>

          </div>
        </div>
      </div>
    </div>
  )
}



export default DetallePostulado