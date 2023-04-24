import React from "react";
import { evento } from "@/pages/empresa";
import { EventCard } from "./EventCard";
interface Props2 {
  eventos: evento[];
}
const ListaEventos: React.FC<Props2> = ({ eventos }) => {
  console.log("lista de eventos", eventos);
  if (eventos.length === 0) {
    return (
      <div>
        <h2>No se han cargado eventos todavia</h2>
      </div>
    );
  }

  return (
    <div>
      {eventos &&
        eventos.map((event: evento) => {
          if (event.isDeleted === false) {
            return (
              <div>
                <EventCard
                  nombre={event.nombre}
                  fecha_inicio={event.fecha_inicio}
                  observaciones={event.observaciones}
                  hora={event.fecha_inicio}
                  lugar={event.lugar}
                  isDeleted={event.isDeleted}
                />
              </div>
            );
          }
        })}
    </div>
  );
};
export default ListaEventos;
