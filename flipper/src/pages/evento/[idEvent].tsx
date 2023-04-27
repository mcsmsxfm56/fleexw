import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { traerEventoYPostulantes } from "@/services/traerEventoYPostulantes";
import { DetalleEvento } from "../../types/Types";
import Link from "next/link";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { PostulanteCard } from "@/components/PostulanteCard";

const EventDatail = () => {
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState<DetalleEvento | null>(null);

  const { idEvent } = router.query;

  useEffect(() => {
    traerEventoYPostulantes(idEvent as string)
      .then((data) => {
        setEventDetail(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex flex-col justify-center items-center ">
        <p>Evento: {eventDetail?.nombre}</p>
        <p>Fecha de Inicio: {eventDetail?.fecha_inicio}</p>
        <p>Fecha de Finalizacion: {eventDetail?.fecha_final}</p>
        <p>Perfil Solicitado: {eventDetail?.perfil}</p>
        <p>Ciudad Y Dirección: {eventDetail?.lugar}</p>
        <p>Observaciones: {eventDetail?.observaciones}</p>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div>
          <p className="p-4 mt-4 font-bold border-b-2 border-b-indigo-600 text-indigo-600 text-5xl pr-6 pl-6 rounded-sm mb-8">
            Postulaciones
          </p>
        </div>
        {eventDetail?.trabajadores?.map((trabajadorPorEvento) => {
          const idPostulante = trabajadorPorEvento.trabajadorId;
          if (trabajadorPorEvento.status === "PENDIENTE")
            return (
              <>
                <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                  Pendientes
                </p>
                <ul>
                  <PostulanteCard
                    idPostulante={idPostulante}
                    nombre={trabajadorPorEvento.trabajadores.name}
                    status={trabajadorPorEvento.status}
                  />
                </ul>
              </>
            );
          if (trabajadorPorEvento.status === "RECHAZADO")
            return (
              <>
                <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                  Rechazados
                </p>
                <ul>
                  <PostulanteCard
                    idPostulante={idPostulante}
                    nombre={trabajadorPorEvento.trabajadores.name}
                    status={trabajadorPorEvento.status}
                  />
                </ul>
              </>
            );
          return (
            <>
              <p className="font-bold text-white text-2xl bg-indigo-600 p-2 pr-6 pl-6 rounded-sm mb-4 mt-4">
                Aprobados
              </p>
              <ul>
                <PostulanteCard
                  idPostulante={idPostulante}
                  nombre={trabajadorPorEvento.trabajadores.name}
                  status={trabajadorPorEvento.status}
                />
              </ul>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default EventDatail;
