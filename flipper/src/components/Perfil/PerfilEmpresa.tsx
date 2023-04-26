import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import axios from "axios";
import React, { useState } from "react";
import Image from 'next/image'
import perfilProvisorio from '../../assets/images/imagenPerfilProvisoria.png'

interface ProfileEmpresa  { 
  email: string 
  nombre: string 
  isDeleted:boolean
  nombreceo: string   
  ciudad: string 
  direccion: string 
  telefono: string 
  eventos: [],
}


const PerfilEmpresa: React.FC = () => {  
  const [profile, setProfile] = useState<ProfileEmpresa>()
  const {nombre} = useSesionUsuarioContext();  

  const userEvent = async () => {    
    await axios
      .get(`http://localhost:3000/api/empresa/${nombre}`)
      .then((response) => {
        setProfile(response.data)})
      .catch((e) => e.message);
  };
  
  React.useEffect(() => {
    userEvent();
  }, []);

  return (
    <>
    <div className="card h-2/4 w-2/4 bg-#1E1E1E shadow-inner border-solid border-4 rounded-2xl border-[#4B39EF]">
    <figure className="px-10 pt-10">
    <Image className="w-36 text-black" src= {perfilProvisorio} alt="Picture of the author" />
    </figure>
    <div className="card-body items-center text-center">
      <div className="mb-6">
      <h2 className="text-5xl text-black">{profile?.nombre}</h2>
      </div>
      
     <h5 className="text-3xl font-bold text-black">Nombre Ceo: {profile?.nombreceo }</h5>
     <h5 className="text-3xl font-bold text-black">Ciudad: {profile?.ciudad}</h5>
     <h5 className="text-3xl font-bold text-black">Dirección: {profile?.direccion}</h5>
     <h5 className="text-3xl font-bold text-black">Telfono: {profile?.telefono}</h5>
     <h5 className="text-3xl font-bold text-black">Email: {profile?.email}</h5>
    
    </div>
  </div>


   </>
  );
};

export default PerfilEmpresa;
