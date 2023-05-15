import { AiFillDelete, AiFillClockCircle } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { evento } from "@/components/ListaDeEventos/Eventos";
import Link from "next/link";

export const HistorialCard: React.FC<evento> = (evento) => {
  return (
    <div className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full">
      <div className="flex justify-between">
        <Link href={`evento/detalle/${evento.id}`}>
        <p className="text-indigo-700 text-2xl font-bold">{evento.nombre}</p>
        </Link>
        {/* <AiFillDelete className="text-[#731111]" size={30} /> */}
      </div>
      <hr></hr>
      <div className="text-indigo-700">
        <p className="text-2xl font-bold">
          {evento.fecha_inicio.slice(0, 10)}
          {evento.fecha_inicio.slice(0, 10) !==
            evento.fecha_final.slice(0, 10) &&
            ` / ${evento.fecha_final.slice(0, 10)}`}
        </p>
        <p>
          <span className="font-bold mt-2 mb-2">Perfil:</span> {evento.perfil}
        </p>
        <p>
          <span className="font-bold mt-2 mb-2">Pago: $</span> {evento.pago}
        </p>
        <p className="mb-1">
          <span className="font-bold mt-2 mb-2">Observaciones:</span>{" "}
          {evento.observaciones}
        </p>
      </div>
      <div className="text-[#4031c6] flex items-center gap-1">
        <AiFillClockCircle />
        <p className="mr-5">
          {evento.fecha_inicio.slice(11, 16)} {" - "}{" "}
          {evento.fecha_final.slice(11, 16)}
        </p>
        <IoLocationSharp />
        {evento.lugar}
      </div>
    </div>
  );
};
