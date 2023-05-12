import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import React, { useState } from "react";
import Image from "next/image";
import perfilProvisorio from "../../assets/images/imagenPerfilProvisoria.png";
import { useRouter } from "next/router";

interface ProfileEmpresa {
  email: string;
  nombre: string;
  isDeleted: boolean;
  nombreceo: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  eventos: [];
}

const PerfilEmpresa: React.FC = () => {
  const [profile, setProfile] = useState<ProfileEmpresa>();
  const { token, id, foto } = useSesionUsuarioContext();
  // console.log(nombre);
  const router = useRouter();

  const userEvent = async () => {
    await fetch("/api/empresa", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        realmethod: "GET",
        // nombreEmpresa: nombre,
        idEmpresa: id,
        function: "misEventos",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((e) => e.message);
  };

  React.useEffect(() => {
    userEvent();
  }, []);

  const stylesProfile = {
    datos: "text-lg md:text-3xl md:text-left p-2 font-bold text-black",
    button: "btn btn-primary btn-sm md:btn-md mx-1",
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" bg-[#D9D9D9] border-2 rounded-3xl border-[#4B39EF] divide-solid p-5 md:p-5">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-3">
          <Image
            className="w-auto inline-flex rounded-full"
            src={foto || perfilProvisorio}
            width={80}
            height={80}
            alt="Picture of the author"
          />
          <h2 className="inline-flex text-3xl font-bold text-indigo-600 capitalize text-center">
            {profile?.nombre}
          </h2>
        </div>

        <div className="p-5">
          <h5 className={stylesProfile.datos}>
            Nombre Ceo: {profile?.nombreceo}
          </h5>
          <h5 className={stylesProfile.datos}>Ciudad: {profile?.ciudad}</h5>
          <h5 className={stylesProfile.datos}>
            Dirección: {profile?.direccion}
          </h5>
          <h5 className={stylesProfile.datos}>Telfono: {profile?.telefono}</h5>
          <h5 className={stylesProfile.datos}>Email: {profile?.email}</h5>
          <div className="flex justify-between m-4 md:mx-10">
            <button
              onClick={() => router.push("/editar")}
              className={stylesProfile.button}
            >
              Modificar
            </button>
            <button
              onClick={() => router.back()}
              className={stylesProfile.button}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilEmpresa;
