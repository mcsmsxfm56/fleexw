import React from "react";
// import { evento } from "@/components/ListaDeEventos/Eventos";
import { EventCard } from "../ListaDeEventos/EventCard";
import { DetalleEvento } from "@/types/Types";

interface eventoTrabajador {
  evento: DetalleEvento;
  eventoId: string;
  notificacionVista: boolean;
  status: string;
  trabajadorId: string;
}

const aprobadoStyle = "text-green-700 border-green-700 bg-green-300";

interface Props {
  eventos: [] | undefined;
}
const ListaEventosTrabajador: React.FC<Props> = ({ eventos }) => {
  return (
    <div className="w-full h-full md:w-9/12">
      {eventos ? (
        eventos.map((event: eventoTrabajador) => {
          return (
            <div
              key={`${event.eventoId}_key`}
              className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full text-indigo-700 shadow-2xl"
            >
              <div className="flex flex-col">
                <h2
                  className={`flex justify-start font-bold self-center border-2 border-solid px-8 py-1 rounded-xl
                  ${aprobadoStyle}
                  `}
                >
                  {event.status == "APROBADO" ? "CONFIRMADO" : event.status}
                </h2>
                <h2 className="flex justify-start font-bold">
                  Evento:{" "}
                  <p className="font-normal ml-2">{event.evento.nombre}</p>
                </h2>
                <h2 className="flex justify-start font-bold">
                  Lugar:{" "}
                  <p className="font-normal ml-2">
                    {event.evento.establecimiento}
                  </p>
                </h2>
                <h2 className="flex justify-start flex-wrap font-bold">
                  Fecha Inicio:{" "}
                  <p className="font-normal mx-2">
                    {event.evento.fecha_inicio.slice(0, 10)}
                  </p>
                  {" : "}
                  <p className="font-normal mx-2">
                    {event.evento.fecha_inicio.slice(11, 16)}
                  </p>
                </h2>

                <h2 className="flex justify-start flex-wrap font-bold">
                  Fecha Final:{" "}
                  <p className="font-normal mx-2">
                    {event.evento.fecha_final.slice(0, 10)}
                  </p>
                  {" : "}
                  <p className="font-normal mx-2">
                    {event.evento.fecha_final.slice(11, 16)}
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
