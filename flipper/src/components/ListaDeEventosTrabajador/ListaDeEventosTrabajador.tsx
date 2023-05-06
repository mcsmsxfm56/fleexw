import React from "react";
import { evento } from "@/components/ListaDeEventos/Eventos";
import { EventCardTrabajador } from "./EventCardTrabajador";

export interface EventoTrabajador {
  perfil: string;
  nombre: string;
  fecha_inicio: string;
  observaciones: string;
  hora: string;
  lugar: string;
  isDeleted: boolean;
  id: string;
  cupos: number;
  pago: number;
  admitePostulaciones: boolean;
}
interface Props2 {
  eventos: EventoTrabajador[];
}
const ListaEventosTrabajador: React.FC<Props2> = ({ eventos }) => {
  //console.log("ListaDeEventos.tsx");
  //console.log(eventos);

  if (eventos?.filter((evento) => evento.isDeleted === false).length === 0) {
    return (
      <div className="w-full md:w-10/12 lg:w-3/5 flex justify-center items-center ">
        <h2 className="mt-20 font-bold">Lo sentimos, aun no hay eventos disponibles en tu ciudad.</h2>
      </div>
    );
  }

  return (
    <div className="w-full md:w-10/12 lg:w-3/5">
      {eventos ? (
        eventos.map((event: EventoTrabajador) => {
          if (event.isDeleted === false) {
            return (
              <div key={`${event.nombre}_key`}>
                <EventCardTrabajador
                  key={event.id}
                  perfil={event.perfil}
                  nombre={event.nombre}
                  fecha_inicio={event.fecha_inicio}
                  observaciones={event.observaciones}
                  hora={event.fecha_inicio}
                  lugar={event.lugar}
                  isDeleted={event.isDeleted}
                  id={event.id}
                  pago={event.cupos}
                  cupos={event.pago}
                  admitePostulaciones={event.admitePostulaciones}
                />
              </div>
            );
          }
        })
      ) : (
        <div className="w-full md:w-10/12 lg:w-3/5 flex justify-center items-center font-bold mt-20">
          <h2>Cargando Eventos</h2>
        </div>
      )}
    </div>
  );
};
export default ListaEventosTrabajador;
