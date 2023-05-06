import { AiFillDelete, AiFillClockCircle } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { Props, evento } from "@/components/ListaDeEventos/Eventos";
import { useRouter } from "next/router";
import { EventoTrabajador } from "./ListaDeEventosTrabajador";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
interface EventCardProps {
  nombreEvento: string;
  fechaEvento: string;
  observaciones: string;
  hora: string;
  direccion: string;
  idEvento: string;
}
interface trabajador {
  eventoId: string
  notificacionVista: boolean
  status: string
  trabajadorId: string
  trabajadores: []

}

interface trabajadores {
  admitePostulaciones: boolean
  cupos: Number
  fecha_final: string
  fecha_inicio: string
  id: string
  id_empresa: string
  isDeleted: boolean
  lugar: string
  nombre: string
  numeroPostulantes: Number
  observaciones: string
  pago: Number
  perfil: string
  trabajadores: trabajador[]
}

export const EventCardTrabajador: React.FC<EventoTrabajador> = (evento) => {
  // console.log("card", evento);
  const { id } = useSesionUsuarioContext();
  const router = useRouter();
  const [postulantes, setTrabajadores] = useState<trabajadores>()
  //guarda los trabajadores del evento

  const trabajadorPostulado = postulantes?.trabajadores.find(trabajador => trabajador.trabajadorId === id)
  // console.log(trabajadorPostulado)

  const getEventos = async () => {
    const eventos = await axios(
      {
        method: 'PUT',
        url: `/api/event`,
        data: {
          eventoId: evento.id,
          realmethod: "GET"
        }
      })
    setTrabajadores(eventos.data)
  }

  useEffect(() => {
    if (id) {
      getEventos()
    }
  }, [])


  return (
    <div className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full">
      <div className="flex justify-between">
        <Link href={`/evento/detalle/${evento.id}`}>
          <p className="text-indigo-700 text-2xl font-bold">{evento.nombre}</p>
        </Link>
      </div>
      <hr></hr>
      <div className="text-indigo-700 flex justify-around">
        <div className="w-[60%]">
          <p className="text-2xl font-bold">
            {evento.fecha_inicio.slice(0, 10)}
          </p>
          <p>
            <span className="font-bold mt-2 mb-2">Perfil:</span> {evento.perfil}
          </p>
          <p className="mb-1">
            <span className="font-bold mt-2 mb-2">Observaciones:</span>{" "}
            {evento.observaciones}
          </p>
        </div>
        <div className="w-[30%] flex justify-center items-center">
          {evento.admitePostulaciones ? (
            <button
              className="rounded-md btn bg-[#4B39EF] normal-case text-[20px] text-white border-transparent hover:bg-[#605BDC]"

              onClick={async () => {
                let response = await fetch("/api/trabajadoreseneventos", {
                  method: "POST",
                  body: JSON.stringify({
                    trabajadorId: id,
                    eventoId: evento.id,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                })
                  .then((response) => response.text())
                  .then((msg) => {
                    alert(msg);
                    if (msg === "postulacion realizada con exito") {
                      router.push(`/evento/detalle/${evento.id}`);
                    } else if (
                      msg === "No se aceptan mas postulaciones en este evento"
                    ) {
                      router.reload();
                    }
                  });
              }}
            >
              {trabajadorPostulado ? 'Estas postulado' : 'Postularse'}
            </button>
          ) : (
            <p className="bg-red-300 text-center text-lg font-bold px-2 rounded-lg">No se admiten más postulaciones</p>
          )}
        </div>
      </div>
      <div className="text-[#4031c6] flex items-center gap-1 capitalize ml-2">
        <AiFillClockCircle />
        <p className="mr-5">{evento.hora.slice(11, 16)}</p>
        <IoLocationSharp />
        {evento.lugar}
      </div>
    </div>
  );
};
