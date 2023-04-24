import { AiFillDelete, AiFillClockCircle } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

interface EventCardProps {
  nombreEvento: string;
  fechaEvento: string;
  observaciones: string;
  hora: string;
  direccion: string;
}

export default function EventCard(CardEvent: EventCardProps) {
  return (
    <div className="bg-[#111113] rounded-md border-2 border-[#787d81] h-[166px] flex flex-col justify-between">
      <div className="flex justify-between">
        <p className="text-[#1414ba] text-2xl">{CardEvent.nombreEvento}</p>
        <AiFillDelete className="text-[#731111]" size={30} />
      </div>
      <hr></hr>
      <div className="text-white">
        <p className="text-2xl">{CardEvent.fechaEvento}</p>
        <p>{CardEvent.observaciones}</p>
      </div>
      <div className="text-[#4031c6] flex">
        <AiFillClockCircle />
        <p className="mr-5">{CardEvent.hora}</p>
        <IoLocationSharp />
        {CardEvent.direccion}
      </div>
    </div>
  );
}
