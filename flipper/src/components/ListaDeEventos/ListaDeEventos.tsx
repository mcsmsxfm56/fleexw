import React from "react";
import { evento } from "@/components/ListaDeEventos/Eventos";
import { EventCard } from "./EventCard";
interface Props2 {
  eventos: evento[];
}
const ListaEventos: React.FC<Props2> = ({ eventos }) => {
  /*  console.log("lista de eventos", eventos); 
  ESTO SE SACO POR QUE ROMPE EL DEPLOY, RESULTA QUE SI EN ALGUN MOMENTO EVENTOS ES UN
  ARRAY VACIO (LO QUE OCURRE CUANDO SE LLAMA AL BACK POR LOS EVENTOS), JAVASCRIPT LO EVALUA
  COMO undefined, undefined.filter RETORNA UN ERROR DE TIPADO
  console.log("ListaDeEventos.tsx");
  console.log(eventos);

    if (eventos.filter((evento) => evento.isDeleted === false).length === 0) {
      return (
        <div>
          <h2>No se han cargado eventos todavia</h2>
        </div>
      );
    }
  
*/
  return (
    <div className="w-full">
      {eventos ? (
        eventos.map((event: evento) => {
          if (event.isDeleted === false) {
            return (
              <div key={`${event.nombre}_key`}>
                <EventCard
                  key={event.id}
                  perfil={event.perfil}
                  nombre={event.nombre}
                  fecha_inicio={event.fecha_inicio}
                  observaciones={event.observaciones}
                  hora={event.fecha_inicio}
                  lugar={event.lugar}
                  isDeleted={event.isDeleted}
                  id={event.id}
                />
              </div>
            );
          }
        })
      ) : (
        <div>
          <h2>No se han cargado eventos todavia</h2>
        </div>
      )}
    </div>
  );
};
export default ListaEventos;
