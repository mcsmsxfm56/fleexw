import { AiFillDelete, AiFillClockCircle } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { Props, evento } from "@/components/ListaDeEventos/Eventos";
import { useRouter } from "next/router";
import { EventoTrabajador } from "./ListaDeEventosTrabajador";

import Link from "next/link";
interface EventCardProps {
  nombreEvento: string;
  fechaEvento: string;
  observaciones: string;
  hora: string;
  direccion: string;
}

export const EventCardTrabajador: React.FC<EventoTrabajador> = (evento) => {
  /* console.log("card", evento); */

  const router = useRouter();

  return (
    <div className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full">
      <div className="flex justify-between">
        <p className="text-indigo-700 text-2xl font-bold">{evento.nombre}</p>
      </div>
      <hr></hr>
      <div className="text-indigo-700 flex">
        <div className="flex-1">
          <p className="text-2xl font-bold">
            {evento.fecha_inicio.slice(0, 10)}
          </p>
          <p>
            <span className="font-bold mt-2 mb-2">Perfil:</span> {evento.perfil}
          </p>
          <p className="mb-1">
            <span className="font-bold mt-2 mb-2">Observaciones:</span>{" "}
            {evento.observaciones}
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link href={`evento/detalle/${evento.id}`}>Postularse</Link>
        </div>
      </div>
      <div className="text-[#4031c6] flex items-center gap-1 capitalize">
        <AiFillClockCircle />
        <p className="mr-5">{evento.hora.slice(11, 16)}</p>
        <IoLocationSharp />
        {evento.lugar}
      </div>
    </div>
  );
};
