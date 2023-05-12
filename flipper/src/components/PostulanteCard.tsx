import React from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Link from "next/link";
import { log } from "console";
import { aceptarORechazarPostulante } from "@/services/aceptarORechazarPostulante";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

interface PropsCard {
  idEvent: string;
  idPostulante: string;
  nombre: string;
  status: string;
}

export const PostulanteCard: React.FC<PropsCard> = ({
  idEvent,
  idPostulante,
  nombre,
  status,
}) => {
  const { token } = useSesionUsuarioContext();
  const handleStatus = (statusNuevo: string) => {
    aceptarORechazarPostulante({ idPostulante, statusNuevo, idEvent, token });
  };
  return (
    <li>
      <div
        className={
          status === "PENDIENTE"
            ? "bg-yellow-300 flex p-4 rounded-md justify-between w-full gap-2 mb-6"
            : status === "RECHAZADO"
            ? "bg-red-400 flex p-4 rounded-md justify-between w-full gap-2 mb-2"
            : "bg-green-300 flex p-4 rounded-md justify-between w-full gap-2 mb-2"
        }
      >
        <div>
          <Link
            href={`/postulaciones/${idPostulante}`}
            className="text-indigo-600 font-bold capitalize"
          >
            {nombre}
          </Link>
          <p className="text-indigo-600 font-bold">
            Perfil: <span>Ejemplo hardcodeado</span>
          </p>
        </div>
        <div className="min-w-[250px] flex justify-end gap-4 ">
          {status !== "RECHAZADO" && (
            <button onClick={() => handleStatus("RECHAZADO")}>
              <BsXCircleFill className="text-[red]" size={30} />
            </button>
          )}
          {status !== "APROBADO" && (
            <button onClick={() => handleStatus("APROBADO")}>
              <BsCheckCircleFill className="text-[green]" size={30} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
