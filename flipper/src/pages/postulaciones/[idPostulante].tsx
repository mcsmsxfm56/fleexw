import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import Link from "next/link";

interface Postulante {
  name: string;
  ciudad: string;
  direccion: string;
  email: string;
  phone: string;
  genero: string;
  edad: string;
  estatura: string;
  grupo_sanguineo: string;
  talla_camiseta: string;
  idType: string;
  idNumber: number;
  nacimiento: string;
  foto: string;
  cv: string;
  certificado_bancario: string;
  rut: string;
}

function DetallePostulado() {
  const [trabajador, setTrabajador] = useState<Postulante>();
  const route = useRouter();
  const { idPostulante } = route.query;
  const { token } = useSesionUsuarioContext();
  // console.log(idPostulante)

  const fetcherProfile: Fetcher<any, string> = async (apiRoute: string) => {
    return await fetch(apiRoute, {
      method: "PUT",
      headers: {
        Accept: "Aplication/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        realmethod: "GET",
        id: idPostulante,
      }),
    })
      .then((res) => res.json())
      .catch((error) => error);
  };

  let { isLoading, error, data } = useSWR("/api/trabajador", fetcherProfile);

  const styles = {
    input: "font-mono text text-3xl text-indigo-600 capitalize",
  };

  const categoriStyle =
    "font-mono text-2xl underline uppercase font-bold text-indigo-600";
  const dataStyle = "font-bold text-base text-indigo-600 p-1";
  const section = "bg-white rounded-md p-4 w-full";

  return (
    <div className="flex justify-center w-full h-full bg-gray-200">
      <div className=" md:w-2/4 md:flex">
        <div className="flex flex-col items-center mx-auto w-full">
          <div className="flex items-center gap-4 p-4 bg-white w-full rounded-md mt-6 border-x-2 border-indigo-600">
            <img
              className="w-32 rounded-full"
              src={data?.foto?.split(" ").slice(1)}
              alt="Picture of the author"
            />
            <div className="ml-10">
              <h3 className={styles.input}>{data?.name}</h3>
              <p className="text-indigo-600">Trabajador</p>
            </div>
          </div>
          <div className="flex-col justify-center items-center w-full mt-4">
            <div className="flex justify-center my-1 w-full p-4">
              <h4 className={categoriStyle}>Información de contacto</h4>
            </div>
            <div className={section}>
              <h5 className={dataStyle}>
                Ciudad:{" "}
                <span className="font-normal text-xl capitalize">
                  {data?.ciudad ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Direccion:{" "}
                <span className="font-normal text-xl capitalize">
                  {data?.direccion ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Email:{" "}
                <span className="font-normal text-xl">
                  {data?.email ?? "-"}
                </span>
              </h5>
              <h5 className={dataStyle}>
                Teléfono:{" "}
                <span className="font-normal text-xl">
                  {data?.phone ?? "-"}
                </span>{" "}
              </h5>
            </div>
            <div className="flex justify-center my-1 p-4">
              <h4 className={categoriStyle}>Información Personal</h4>
            </div>
            <div className={section}>
              <h5 className={dataStyle}>
                Género:{" "}
                <span className="font-normal text-xl capitalize">
                  {data?.genero ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Edad:{" "}
                <span className="font-normal text-xl">{data?.edad ?? "-"}</span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Estatura:{" "}
                <span className="font-normal text-xl">
                  {data?.estatura ?? "-"}{" "}
                </span>
              </h5>
              <h5 className={dataStyle}>
                Grupo Sanguíneo:{" "}
                <span className="font-normal text-xl">
                  {data?.grupo_sanguineo ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Talle de camisa:{" "}
                <span className="font-normal text-xl capitalize">
                  {data?.talle_camiseta}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Tipo de identificación:{" "}
                <span className="font-normal text-xl capitalize">
                  {data?.idType ?? "-"}
                </span>{" "}
              </h5>
              <h5 className={dataStyle}>
                Identificacion:{" "}
                <span className="font-normal text-xl">
                  {data?.idNumber ?? "-"}
                </span>{" "}
              </h5>
            </div>
            <div className="flex justify-center my-1 p-4">
              <h4 className={categoriStyle}>Archivos Necesarios</h4>
            </div>
            <div className={`${section} mb-4`}>
              <h5 className={dataStyle}>
                Curriculum Vitae:{" "}
                <Link target="_blank" href={`${data?.cv?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl capitalize hover:underline">
                    {data?.cv?.split(" ").slice(0, 1) ?? "-"}
                  </span>{" "}
                </Link>
              </h5>
              <h5 className={dataStyle}>
                Rut:{" "}
                <Link
                  download
                  target="_blank"
                  href={`${data?.rut?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl hover:underline">
                    {data?.rut?.split(" ").slice(0, 1) ?? "-"}
                  </span>{" "}
                </Link>
              </h5>
              <h5 className={dataStyle}>
                Certificado Bancario:{" "}
                <Link
                  download
                  target="_blank"
                  href={`${data?.certificado_bancario?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl hover:underline">
                    {data?.certificado_bancario?.split(" ").slice(0, 1) ?? "-"}{" "}
                  </span>
                </Link>
              </h5>
              <h5 className={dataStyle}>
                Documento de Identidad:{" "}
                <Link
                  download="imagen"
                  target="_blank"
                  href={`${data?.imagen_dni?.split(" ").slice(1)}`}>
                  <span className="font-normal text-xl hover:underline">
                    {data?.imagen_dni?.split(" ").slice(0, 1) ?? "-"}
                  </span>{" "}
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePostulado;
