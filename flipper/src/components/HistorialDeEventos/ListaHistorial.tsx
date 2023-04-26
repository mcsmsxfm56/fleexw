import React from "react";
import { evento } from "@/components/ListaDeEventos/Eventos";
import { HistorialCard } from "./HistorialCard";

interface Props2 {
  eventos: evento[];
}

const ListaHistorial: React.FC<Props2> = ({ eventos }) => {
  if (eventos.length === 0) {
    return (
      <div>
        <h2>No se han cargado eventos todavia</h2>
      </div>
    );
  }
  console.log(eventos);
  return (
    <div className="w-full">
      {eventos &&
        eventos.map((event: evento) => {
          return (
            <div>
              <HistorialCard
                perfil={event.perfil}
                nombre={event.nombre}
                fecha_inicio={event.fecha_inicio}
                observaciones={event.observaciones}
                hora={event.fecha_inicio}
                lugar={event.lugar}
                isDeleted={event.isDeleted}
              />
            </div>
          );
        })}
    </div>
  );
};
export default ListaHistorial;
