import React from "react";
import { evento } from "@/components/ListaDeEventos/Eventos";
import { CardEventoDiponibles } from "./CardEventoDiponibles";

export interface EventoTrabajador {
  perfil: string;
  nombre: string;
  fecha_inicio: string;
  fecha_final: string
  observaciones: string;
  horaInicio: string;
  horaFinal: string;
  lugar: string;
  isDeleted: boolean;
  id: string;
  cupos: number;
  pago: number;
  admitePostulaciones: boolean;
  establecimiento: String
  numeroPostulantes: Number
}
interface Props2 {
  eventos: EventoTrabajador[];
}
const ListaEventosTrabajador: React.FC<Props2> = ({ eventos }) => {

  if (eventos?.filter((evento) => evento.isDeleted === false).length === 0) {
    return (
      <div className="w-full md:w-10/12 lg:w-3/5 flex justify-center items-center ">
        <h2 className="mt-20 font-bold">Lo sentimos, aun no hay eventos disponibles en tu ciudad.</h2>
      </div>
    );
  }

  return (
    <div className="w-full md:w-10/12 lg:w-11/12">
      {eventos ? (
        eventos.map((event: EventoTrabajador) => {
          if (event.isDeleted === false) {
            return (
              <div key={`${event.id}_key`}>
                <CardEventoDiponibles
                  key={event.id}
                  perfil={event.perfil}
                  nombre={event.nombre}
                  fecha_inicio={event.fecha_inicio}
                  fecha_final={event.fecha_final}
                  observaciones={event.observaciones}
                  horaInicio={event.fecha_inicio}
                  horaFinal={event.fecha_final}
                  lugar={event.lugar}
                  isDeleted={event.isDeleted}
                  id={event.id}
                  pago={event.pago}
                  cupos={event.cupos}
                  admitePostulaciones={event.admitePostulaciones}
                  establecimiento={event.establecimiento}
                  numeroPostulantes={event.numeroPostulantes}
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
