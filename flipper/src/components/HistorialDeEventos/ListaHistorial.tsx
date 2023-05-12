import React from "react";
import { evento } from "@/components/ListaDeEventos/Eventos";
import { HistorialCard } from "./HistorialCard";

interface Props2 {
  eventos: evento[];
}

const ListaHistorial: React.FC<Props2> = ({ eventos }) => {
  if (eventos?.length === 0) {
    return (
      <div>
        <h2>No se han cargado eventos todavia</h2>
      </div>
    );
  }
  return (
    <div className="w-full md:w-9/12">
      {eventos &&
        eventos.map((event: evento, index) => {
          return (
            <div key={`historial_evento_${index}`}>
              <HistorialCard
                perfil={event.perfil}
                nombre={event.nombre}
                fecha_inicio={event.fecha_inicio}
                fecha_final={event.fecha_final}
                observaciones={event.observaciones}
                hora={event.fecha_inicio}
                lugar={event.lugar}
                isDeleted={event.isDeleted}
                pago={event.pago}
                id={event.id}
              />
            </div>
          );
        })}
    </div>
  );
};
export default ListaHistorial;
