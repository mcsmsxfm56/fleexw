import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { useEffect, useState } from "react";
import ListaEventosTrabajador from "./ListaEventosTrabajador";

const EventosConfirmadosTrabajador = () => {
  const { id } = useSesionUsuarioContext();
  const [dataEvento, setDataEvento] = useState<[]>();

  const getEventos = async () => {
    const eventos = fetch("/api/trabajadoreseneventos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trabajadorId: id,
        realmethod: "GET",
      }),
    })
      .then((res) => res.json())
      .then((eventos) => setDataEvento(eventos));
  };

  useEffect(() => {
    if (id) {
      getEventos();
    }
  }, []);

  return (
    <div className="h-full w-full bg-gray-200">
      <div className="p-2">
        <h1 className="text-5xl mt-20 md:mt-10 text-indigo-700 text-center md:text-center">
          Eventos Confirmados
        </h1>

        <div className="p-2 flex justify-center">
          {!dataEvento ? (
            <h2>Todavia no posee eventos confirmados</h2>
          ) : (
            <ListaEventosTrabajador eventos={dataEvento} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventosConfirmadosTrabajador;
