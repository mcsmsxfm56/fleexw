import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import axios from "axios";
import React, { useState } from "react";
import ListaHistorial from "./ListaHistorial";
import { useExcelDownloder } from "react-xls";

export interface evento {
  perfil: string;
  nombre: string;
  fecha_inicio: string;
  observaciones: string;
  hora: string;
  lugar: string;
  isDeleted: boolean;
  id: string;
}
export interface Props {
  eventos: evento[];
}

interface eventoExcel {
  cupos: string;
  fecha_final: string;
  fecha_inicio: string;
  id: string;
  id_empresa: string;
  isDeleted: boolean;
  lugar: string;
  nombre: string;
  observaciones: string;
  pago: number;
  perfil: string;
  trabajadores: {
    eventoId: string;
    trabajadorId: string;
    status: string;
    trabajadores: {
      id: string;
      name: string;
      idType: string;
      idNumber: number;
      nacimiento: null;
      genero: null;
      phone: number;
      email: string;
      ciudad: null;
      direccion: null;
      estatura: null;
      talla_camiseta: null;
      grupo_sanguineo: null;
      imagen_dni: null;
      foto: null;
      cv: null;
      rut: null;
      certificado_bancario: null;
      password: string;
      isDeleted: boolean;
    };
  }[];
}
interface dataType {
  datos_Eventos: {}[];
}
const Historial: React.FC = () => {
  const [eventos, setEventos] = useState<Props>({ eventos: [] });
  const userContext = useSesionUsuarioContext();
  const { ExcelDownloder, Type } = useExcelDownloder();
  //const [data, setData] = useState<dataType>({datos_Eventos: []});
  const data2: dataType = {
    // Worksheet named animals
    datos_Eventos: [],
    // Worksheet named pokemons
  };

  const userEvent = async () => {
    const sessionName = localStorage.getItem("nombre");
    await axios
      .get(`api/empresa/${sessionName}`)
      .then((response) => {
        setEventos(response.data);
        response.data.eventos.map((evento: eventoExcel) => {
          evento.trabajadores.map((obj) => {
            let objExcel = {
              nombre_trabajador: obj.trabajadores.name,
              fecha_del_evento: evento.fecha_inicio,
              nombre_del_evento: evento.nombre,
              perfil: evento.perfil,
              lugar_del_evento: evento.lugar,
              pago: evento.pago,
            };
            data2.datos_Eventos.push(objExcel);
          });
        });
      })
      .catch((e) => e.message);
  };
  React.useEffect(() => {
    userEvent();
  }, []);
  //console.log(eventos);
  return (
    <div
      className="h-full bg-gray-200 md:w-4/5 md:ml-[12%] lg:ml-[250px]
            lg:w-[calc(100vw-268px)]">
      <div className="p-2 text-center pt-16">
        <h1 className="text-5xl max-sm:text-4xl max-sm:font-bold capitalize mb-2 mt-4 text-indigo-700">
          Historial de Eventos<br></br>
          <ExcelDownloder
            data={data2}
            filename={"datosEventos"}
            type={Type.Button} // or type={'button'}
          >
            Descargar excel
          </ExcelDownloder>
        </h1>
      </div>
      <div className="p-2 flex justify-center">
        <ListaHistorial eventos={eventos?.eventos} />
      </div>
    </div>
  );
};

export default Historial;
