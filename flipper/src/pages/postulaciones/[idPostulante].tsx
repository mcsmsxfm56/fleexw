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


  const getData = async (id: string) => {
    await axios
      .get(`http://localhost:3000/api/trabajador/${id}`)
      .then((response) => setTrabajador(response.data))
      .catch((e) => e.message);
  }


  useEffect(() => {
    getData(idPostulante as string)
  }, [idPostulante])


  const titleStyle = 'font-mono text text-3xl text-black'
  const categoriStyle = 'font-mono text-2xl text-black underline decoration-2'
  const dataStyle = 'font-mono text-2xl text-black'
  const section = 'bg-gray-400 opacity-25 items-start '

  return (
    <div className="max-h-full">
      <div className=" bg-[#D9D9D9] flex my-3 mx-auto border-2 rounded-3xl border-[#4B39EF] divide-solid w-2/4 h-full">
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-2">
            <img className="w-28 text-black" src={trabajador?.foto} alt="Picture of the author" />
          </figure>

          <div className="mb-4">
            <h2 className={titleStyle}>{trabajador?.name}</h2>
          </div>
          <div className={section}>
            <h4 className={categoriStyle}>Información de contacto</h4>
          </div>

          <h5 className={dataStyle} >Ciudad: {trabajador?.ciudad ?? '-'} </h5>
          <h5 className={dataStyle} >Direccion: {trabajador?.direccion ?? '-'} </h5>
          <h5 className={dataStyle} >Email: {trabajador?.email ?? '-'}</h5>
          <h5 className={dataStyle} >Teléfono:{trabajador?.phone ?? '-'} </h5>
          <div className={section}>
            <h4 className={categoriStyle}>Información Personal</h4>
          </div>
          <h5 className={dataStyle} >Género:{trabajador?.genero ?? '-'} </h5>
          <h5 className={dataStyle} >Edad: {trabajador?.edad ?? '-'} </h5>
          <h5 className={dataStyle} >Estatura: {trabajador?.estatura ?? '-'}</h5>
          <h5 className={dataStyle} >Grupo Sanguíneo: {trabajador?.grupo_sanguineo ?? '-'} </h5>
          <h5 className={dataStyle} >Talle de camisa: {trabajador?.talla_camiseta ?? '-'} </h5>
          <h5 className={dataStyle} >Tipo de identificación: {trabajador?.idType ?? '-'} </h5>
          <h5 className={dataStyle} >Identificacion: {trabajador?.idNumber ?? '-'} </h5>

          <div className='space-x-8'>
            <button className="btn btn-primary">Descargar</button>
            <button className="btn btn-primary">Volver</button>

          </div>


        </div>
      </div>
    </div>
  )
}



export default DetallePostulado