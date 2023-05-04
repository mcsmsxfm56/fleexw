import React from "react";
// import { evento } from "@/components/ListaDeEventos/Eventos";
import { EventCard } from "./EventCard";
import { DetalleEvento } from "@/types/Types";

interface eventoTrabajador {
  evento: DetalleEvento
  eventoId: string
  notificacionVista: boolean
  status: string
  trabajadorId: string
}

interface Props {
  eventos: [] | undefined;
}
const ListaEventosTrabajador: React.FC<Props> = ({ eventos }) => {


  if (!eventos) {
    return (
      <div>
        <h2>No tienes Eventos confirmados</h2>
      </div>
    );
  }

  return (
    <div className="w-full md:w-10/12 lg:w-3/5">
      {eventos ? (
        eventos.map((event: eventoTrabajador) => {
          if (event.status === 'APROBADO') {
            return (
              <div className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full">
                <div key={`${event.eventoId}_key`}>
                  <h2>Status: {event.status}</h2>
                  <h2>Evento: {event.evento.nombre}</h2>
                  <h2>Lugar: {event.evento.lugar}</h2>
                  <h2>Pago: ${event.evento.pago}</h2>
                  <h2>Observaciones: {event.evento.observaciones}</h2>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div>
          <h2>No tienes Eventos confirmados</h2>
        </div>
      )}
    </div>
  );
};
export default ListaEventosTrabajador;
