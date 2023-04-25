import { AiFillDelete, AiFillClockCircle } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { Props, evento } from "@/pages/empresa";

interface EventCardProps {
  nombreEvento: string;
  fechaEvento: string;
  observaciones: string;
  hora: string;
  direccion: string;
}

export const EventCard: React.FC<evento> = (evento) => {
  console.log("card", evento);

  return (
    <div className="bg-[#111113] rounded-md border-2 border-[#787d81] h-[166px] flex flex-col justify-between">
      <div className="flex justify-between">
        <p className="text-[#1414ba] text-2xl">{evento.nombre}</p>
        <AiFillDelete className="text-[#731111]" size={30} />
      </div>
      <hr></hr>
      <div className="text-white">
        <p className="text-2xl">{evento.fecha_inicio.slice(0, 10)}</p>
        <p>{evento.observaciones}</p>
      </div>
      <div className="text-[#4031c6] flex">
        <AiFillClockCircle />
        <p className="mr-5">
          {evento.hora.replace("2023-04-22T", "").slice(0, 5)}
        </p>
        <IoLocationSharp />
        {evento.lugar}
      </div>
    </div>
  );
};
