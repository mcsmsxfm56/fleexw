import { AiFillDelete, AiFillClockCircle } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { Props, evento } from "@/components/ListaDeEventos/Eventos";
import { useRouter } from "next/router";

import Link from "next/link";
import { useContext } from "react";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
interface EventCardProps {
  nombreEvento: string;
  fechaEvento: string;
  observaciones: string;
  hora: string;
  direccion: string;
}
const borradoLogico = async (eventoId: string) => {
  await fetch(`/api/event`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      realmethod: "DELETE",
      eventoId,
    }),
  })
    .then((response) => {
      alert("borrado con exito");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const EventCard: React.FC<evento> = (evento) => {
  /* console.log("card", evento); */
  const { rol } = useSesionUsuarioContext()

  const router = useRouter();
  return (
    <div className="bg-white rounded-md border-2 border-[#787d81] h-full flex flex-col justify-between p-2 mb-2 w-full">
      <div className="flex justify-between">
        <p className="text-indigo-700 text-2xl font-bold">{evento.nombre}</p>
        {rol === "empresa" ? (
          <div className="flex gap-8">
            <Link href={`/evento/editar/${evento.id}`}>
              <HiPencil
                className="text-[#f6ea06] rounded-xl border-indigo-700 border-2 border-solid bg-indigo-700 transition duration-200 hover:bg-[#605BDC]"
                size={30}
              />
            </Link>
            <AiFillDelete
              className="text-red-600 cursor-pointer rounded-xl border-indigo-700 border-2 border-solid bg-indigo-700 transition duration-200 hover:bg-[#605BDC]"
              size={30}
              onClick={async () => {
                await borradoLogico(evento.id);
                router.reload();
              }}
            />
          </div>
        ) : null}
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
          <Link
            href={`evento/detalle/${evento.id}`}
            className="btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC]"
          >
            Ver Detalle
          </Link>
        </div>
      </div>
      <div className="text-[#4031c6] flex items-center gap-1">
        <AiFillClockCircle />
        <p className="mr-5">{evento.hora.slice(11, 16)}</p>
        <IoLocationSharp />
        {evento.lugar}
      </div>
    </div>
  );
};
