import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { traerEventoYPostulantes } from "@/services/traerEventoYPostulantes";
import { DetalleEvento, TrabajadorStatus } from '../../../types/Types';
import Link from "next/link";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { PostulanteCard } from "@/components/PostulanteCard";
import AppLayout from "@/components/AppLayout/AppLayout";
import { HiPencil } from "react-icons/hi";
import { log } from 'console';

interface postulante {
  rechazados: TrabajadorStatus[],
  aprobados: TrabajadorStatus[],
  pendientes: TrabajadorStatus[]
}

const EventDatail = () => {
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState<DetalleEvento | null>(null);
  const [postulantes, setPostulantes] = useState<postulante>({
    rechazados: [],
    aprobados: [],
    pendientes: []
  })

  console.log(postulantes);

  const { idEvent } = router.query;

  useEffect(() => {
    if (idEvent) {
      traerEventoYPostulantes(idEvent as string)
        .then((data) => {
          setEventDetail(data);
          console.log(data);
        })
        .catch((error) => console.log(error.message));
    }
  }, [idEvent]);

  useEffect(() => {
    eventDetail?.trabajadores.map((trabajadorPorEvento) => {
      if (trabajadorPorEvento.status === "PENDIENTE") {
        setPostulantes({ ...postulantes, pendientes: [...postulantes.pendientes, trabajadorPorEvento] })
      }
      else if (trabajadorPorEvento.status === "APROBADO") {
        setPostulantes({ ...postulantes, aprobados: [...postulantes.aprobados, trabajadorPorEvento] })
      }
      else {
        setPostulantes({ ...postulantes, rechazados: [...postulantes.rechazados, trabajadorPorEvento] })
      }
    })
  }
    , [eventDetail])

  return (
    <AppLayout>
      <div className="h-full overflow-auto">
        <div
          className="bg-gray-200 md:w-4/5 md:ml-[20%] lg:ml-[250px]
            lg:w-[calc(100vw-268px)] h-screen">
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="w-full mt-10 bg-white text-center text-[#4B39EF] font-bold text-xl py-4 -mx-10">
                Evento: {eventDetail?.nombre}
              </p>
              <HiPencil
                className="text-[#f6ea06]"
                size={30} />
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl">
                  Fecha de Inicio:
                </p>
                <p className="text-center font-bold text-lg">
                  {eventDetail?.fecha_inicio}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-center font-bold text-xl">
                  Fecha de Finalizacion:
                </p>
                <p className="text-center font-bold text-lg">
                  {eventDetail?.fecha_final}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-center font-bold text-xl">
                Perfiles Solicitados:
              </p>
              <p className="text-center font-bold text-lg">
                {" "}
                {eventDetail?.perfil}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-center font-bold text-xl">
                Ciudad Y Dirección:
              </p>
              <p className="text-center font-bold text-lg">
                {eventDetail?.lugar}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-center font-bold text-xl">Observaciones:</p>
              <p className="text-center font-bold text-lg">
                {eventDetail?.observaciones}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <div>
              <p className="p-4 mt-4 font-bold border-b-2 border-b-indigo-600 text-indigo-600 text-5xl pr-6 pl-6 rounded-sm mb-8">
                Postulaciones
              </p>
            </div>
            <div className="h-full">
              <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                Pendientes
              </p>
              <ul>
                {
                  postulantes.pendientes.map((postulante) => {
                    return (
                      <PostulanteCard
                        idEvent={idEvent as string}
                        idPostulante={postulante.trabajadorId}
                        nombre={postulante.trabajadores.name}
                        status={postulante.status}
                      />
                    )
                  })
                }
              </ul>
              <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                Aprobados
              </p>
              <ul>
                {
                  postulantes.aprobados.map((postulante) => {
                    return (
                      <PostulanteCard
                        idEvent={idEvent as string}
                        idPostulante={postulante.trabajadorId}
                        nombre={postulante.trabajadores.name}
                        status={postulante.status}
                      />
                    )
                  })
                }
              </ul>
              <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                Rechazados
              </p>
              <ul>
                {
                  postulantes.rechazados.map((postulante) => {
                    return (
                      <PostulanteCard
                        idEvent={idEvent as string}
                        idPostulante={postulante.trabajadorId}
                        nombre={postulante.trabajadores.name}
                        status={postulante.status}
                      />
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EventDatail;

{/* <ul>
  {eventDetail?.trabajadores?.map((trabajadorPorEvento) => {
    const idPostulante = trabajadorPorEvento.trabajadorId;
    if (trabajadorPorEvento.status === "PENDIENTE")
      return (
        <>
          <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
            Pendientes
          </p>

          <PostulanteCard
            idEvent={idEvent as string}
            idPostulante={idPostulante}
            nombre={trabajadorPorEvento.trabajadores.name}
            status={trabajadorPorEvento.status}
          />

        </>
      );
    if (trabajadorPorEvento.status === "RECHAZADO")
      return (
        <>
          <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
            Rechazados
          </p>

          <PostulanteCard
            idEvent={idEvent as string}
            idPostulante={idPostulante}
            nombre={trabajadorPorEvento.trabajadores.name}
            status={trabajadorPorEvento.status}
          />

        </>
      );
    return (
      <>
        <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
          Aprobados
        </p>

        <PostulanteCard
          idEvent={idEvent as string}
          idPostulante={idPostulante}
          nombre={trabajadorPorEvento.trabajadores.name}
          status={trabajadorPorEvento.status}
        />

      </>
    );
  })} */}