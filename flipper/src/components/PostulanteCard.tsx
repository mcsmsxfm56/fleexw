import React from "react";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Link from "next/link";

interface PropsCard {
  idPostulante: string;
  nombre: string;
  status: string;
}

export const PostulanteCard: React.FC<PropsCard> = ({
  idPostulante,
  nombre,
  status,
}) => {
  return (
    <li>
      <div
        className={
          status === "PENDIENTE"
            ? "bg-yellow-300 flex p-4 rounded-md justify-between w-full gap-2 mb-6"
            : status === "RECHAZADO"
              ? "bg-red-400 flex p-4 rounded-md justify-between w-full gap-2 mb-2"
              : "bg-green-300 flex p-4 rounded-md justify-between w-full gap-2 mb-2"
        }>
        <div>
          <Link
            href={`/postulaciones/${idPostulante}`}
            className="text-indigo-600 font-bold capitalize">
            {nombre}
          </Link>
          <p className="text-indigo-600 font-bold">
            Perfil: <span>Ejemplo hardcodeado</span>
          </p>
        </div>
        <div className="min-w-[250px] flex justify-end gap-4 ">
          {status !== "RECHAZADO" &&
            <IconContext.Provider
              value={{
                color: "red",
                size: "1.5em",
                className: "global-class-name",
              }}>
              <button>
                <BsXCircleFill />
              </button>
            </IconContext.Provider>}
          {
            status !== "APROBADO" &&
            <IconContext.Provider
              value={{
                color: "green",
                size: "1.5em",
                className: "global-class-name",
              }}>
              <button>
                <BsCheckCircleFill />
              </button>
            </IconContext.Provider>}
        </div>
      </div>
    </li>
  );
};
