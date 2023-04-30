import React, { useState } from "react";
import ListaHistorial from "./ListaHistorial";
import { useExcelDownloder } from "react-xls";
import useSWR, { Fetcher } from "swr";

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
const fetcher: Fetcher<any, string> = (apiRoute) => {
  return fetch(apiRoute, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      realmethod: "GET",
      nombreEmpresa: localStorage.getItem("nombre"),
    }),
  }).then((res) => res.json());
};

const Historial: React.FC = () => {
  const { data } = useSWR("/api/empresa", fetcher);
  const [eventos, setEventos] = useState<Props>({ eventos: [] });
  const { ExcelDownloder, Type } = useExcelDownloder();
  const data2: dataType = {
    datos_Eventos: [],
  };

  const userEvent = async () => {
    setEventos(data);
    data.eventos.map((evento: eventoExcel) => {
      evento.trabajadores.map((obj) => {
        let objExcel = {
          nombre_trabajador: obj.trabajadores.name,
          fecha_del_evento: evento.fecha_inicio,
          nombre_del_evento: evento.nombre,
          perfil: evento.perfil,
          lugar_del_evento: evento.lugar,
          pago: evento.pago,
          telefono_trabajador: obj.trabajadores.phone,
        };
        data2.datos_Eventos.push(objExcel);
      });
    });
  };
  React.useEffect(() => {
    userEvent();
  }, []);

  return (
    <div
      className="h-full bg-gray-200 md:w-4/5 md:ml-[12%] lg:ml-[250px]
            lg:w-[calc(100vw-268px)]"
    >
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
