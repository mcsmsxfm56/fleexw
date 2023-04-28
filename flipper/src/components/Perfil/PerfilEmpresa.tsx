import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import perfilProvisorio from "../../assets/images/imagenPerfilProvisoria.png";



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
  const { nombre } = useSesionUsuarioContext();
  console.log(nombre);

  const userEvent = async () => {
    await axios
      .get(`http://localhost:3000/api/empresa/${nombre}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((e) => e.message);
  };

  React.useEffect(() => {
    userEvent();
  }, []);


  const stylesProfile = {
    datos: "text-lg md:text-3xl md:text-left p-2 font-bold text-black",
    button: "btn btn-primary btn-sm md:btn-md mx-1"
  }


  return (
    <div className='flex justify-center items-center h-screen'>

      <div className=" bg-[#D9D9D9] border-2 rounded-3xl border-[#4B39EF] divide-solid p-5 md:p-5">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-3">
          <Image className="w-20 md:w-28 inline-flex rounded-full" src={perfilProvisorio} alt="Picture of the author" />
          <h2 className="inline-flex text-3xl font-bold text-indigo-600 capitalize text-center">
            {profile?.nombre}
          </h2>
        </div>

        <div className="p-5">

          <h5 className={stylesProfile.datos}>
            Nombre Ceo: {profile?.nombreceo}
          </h5>
          <h5 className={stylesProfile.datos}>
            Ciudad: {profile?.ciudad}
          </h5>
          <h5 className={stylesProfile.datos}>
            Dirección: {profile?.direccion}
          </h5>
          <h5 className={stylesProfile.datos}>
            Telfono: {profile?.telefono}
          </h5>
          <h5 className={stylesProfile.datos}>
            Email: {profile?.email}
          </h5>
          <div className='flex justify-between m-4 md:mx-10'>
            <button onClick={() => alert('Esta funcion todavia no está disponible')} className={stylesProfile.button}>Modificar</button>
            <button onClick={() => alert('falta implementar')} className={stylesProfile.button}>Volver</button>
          </div>
        </div>
      </div>
    </div >
    // <div
    //   className="h-screen w-full bg-gray-200 md:w-full md:ml-[4%] lg:ml-[250px]
    //         lg:w-[calc(100vw-268px)] flex justify-center items-center ">
    //   <div className="card lg:w-6/12 h-4/5 lg:pt-0 bg-#1E1E1E shadow-inner border-t-2 border-b-2 rounded-md border-[#4B39EF]">
    //     <div className="card-body p-2 flex flex-col justify-center h-full w-full">
    //       <figure className="mb-6">
    //         <Image
    //           className="w-36 text-black"
    //           src={perfilProvisorio}
    //           alt="Picture of the author"
    //         />
    //       </figure>
    //       <div className="mb-6">
    //         <h2 className="text-3xl font-bold text-indigo-600 capitalize text-center">
    //           {profile?.nombre}
    //         </h2>
    //       </div>
    //       <div className="ml-2 md:flex md:flex-col md:items-start lg:ml-16 2xl:ml-56">
    //         <h5 className="text-lg md:text-2xl md:text-left p-2 font-bold text-black">
    //           Nombre Ceo: {profile?.nombreceo}
    //         </h5>
    //         <h5 className="text-lg md:text-2xl md:text-left font-bold p-2 text-black">
    //           Ciudad: {profile?.ciudad}
    //         </h5>
    //         <h5 className="text-lg md:text-2xl md:text-left font-bold p-2 text-black">
    //           Dirección: {profile?.direccion}
    //         </h5>
    //         <h5 className="text-lg md:text-2xl md:text-left font-bold p-2 text-black">
    //           Telfono: {profile?.telefono}
    //         </h5>
    //         <h5 className="text-lg md:text-2xl md:text-left font-bold p-2 text-black">
    //           Email: {profile?.email}
    //         </h5>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PerfilEmpresa;
