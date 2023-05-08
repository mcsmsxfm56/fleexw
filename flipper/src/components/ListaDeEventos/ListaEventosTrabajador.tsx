import React from "react";
// import { evento } from "@/components/ListaDeEventos/Eventos";
import { EventCard } from "./EventCard";
import { DetalleEvento } from "@/types/Types";

interface eventoTrabajador {
  evento: DetalleEvento;
  eventoId: string;
  notificacionVista: boolean;
  status: string;
  trabajadorId: string;
}

const aprobadoStyle = "text-green-700 border-green-700 bg-green-300";
const faltoStyle = "text-red-700 border-red-700 bg-red-300";

interface Props {
  eventos: [] | undefined;
}
const ListaEventosTrabajador: React.FC<Props> = ({ eventos }) => {
  return (
    <div className="w-full md:w-9/12">
      {eventos ? (
        eventos.map((event: eventoTrabajador) => {
          return (
            <div className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full text-indigo-700">
              <div key={`${event.eventoId}_key`} className="flex flex-col">
                <h2
                  className={`flex justify-start font-bold self-center border-2 border-solid px-8 py-1 rounded-xl
                  ${aprobadoStyle}
                  `}
                >
                  {event.status}
                </h2>
                <h2 className="flex justify-start font-bold">
                  Evento:{" "}
                  <p className="font-normal ml-2">{event.evento.nombre}</p>
                </h2>
                <h2 className="flex justify-start font-bold">
                  Lugar:{" "}
                  <p className="font-normal ml-2">{event.evento.lugar}</p>
                </h2>
                <h2 className="flex justify-start font-bold">
                  Fecha:{" "}
                  <p className="font-normal ml-2">
                    {event.evento.fecha_final.slice(0, 10)}
                  </p>
                </h2>
                <h2 className="flex justify-start font-bold">
                  Pago: <p className="font-normal ml-2">${event.evento.pago}</p>
                </h2>
                <h2 className="flex justify-start font-bold">
                  Observaciones:{" "}
                </h2>
                <p className="font-normal ml-2">{event.evento.observaciones}</p>
              </div>
            </div>
          );
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
