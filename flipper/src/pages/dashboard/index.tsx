import DatagridEmpresa from "./DatagridEmpresa";
import DatagridEventos from "./DatagridEventos";
import DatagridTrabajadores from "./DatagridTrabajadores";
import { downloadExcelAdmin } from "../../components/Excel/generateExcel";
import useSWR from "swr";
import { fetcherDashboard } from "../../services/servicesDashboard";
import {
  objEmpresa,
  objEvento,
  objTrabajador,
  objtrabajadoresEnEventos,
} from "@/types/Types";
import { useState } from "react";
import DatagridTrabajadoresEnEventos from "./DatagridTrabajadoresEnEventos";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { useRouter } from "next/router";
import Link from "next/link";

const buttonStyle =
  "btn bg-[#4B39EF] normal-case text-[24px] text-white border-transparent hover:bg-[#605BDC]";

export default function Dashboard() {
  let isAdmin: boolean;
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (localStorage.getItem("isAdmin") === "true") {
      isAdmin = true;
    } else {
      router.push("/404");
    }
  }

  const { isLoading, error, data } = useSWR("/api/admin", fetcherDashboard);
  let eventosCancelados = 0;

  const sheetTrabajador: objTrabajador[] = [];
  const sheetEmpresa: objEmpresa[] = [];
  const sheetEventos: objEvento[] = [];
  const sheetTrabajadoresEnEventos: objtrabajadoresEnEventos[] = [];

  data?.trabajadoresEnEventosTable.map(
    (objtrabajadoresEnEventos: objtrabajadoresEnEventos) => {
      const objtrabajadoresEnEventos2 = objtrabajadoresEnEventos;
      objtrabajadoresEnEventos2.empresaDelEvento =
        objtrabajadoresEnEventos.evento?.empresa?.nombre;
      objtrabajadoresEnEventos2.nombreDelEvento =
        objtrabajadoresEnEventos.evento?.nombre;
      objtrabajadoresEnEventos2.trabajadorNombre =
        objtrabajadoresEnEventos.trabajadores?.name;
      objtrabajadoresEnEventos2.fechaEvento =
        objtrabajadoresEnEventos2.evento?.fecha_inicio;
      objtrabajadoresEnEventos2.lugarEvento =
        objtrabajadoresEnEventos.evento?.lugar;
      objtrabajadoresEnEventos2.pago = objtrabajadoresEnEventos.evento?.pago;
      objtrabajadoresEnEventos2.eventoCancelado =
        objtrabajadoresEnEventos.evento?.Canceled;
      objtrabajadoresEnEventos2.observacionesEventos =
        objtrabajadoresEnEventos.evento?.observaciones;
      delete objtrabajadoresEnEventos2.eventoId;
      delete objtrabajadoresEnEventos2.trabajadorId;
      delete objtrabajadoresEnEventos2.notificacionVista;
      delete objtrabajadoresEnEventos2.evento;
      delete objtrabajadoresEnEventos2.trabajadores;
      sheetTrabajadoresEnEventos.push(objtrabajadoresEnEventos2);
    }
  );
  data?.empresaTable.map((objEmpresa: objEmpresa) => {
    const objEmpresa2 = objEmpresa;
    delete objEmpresa2.resetContrasenaCode;
    delete objEmpresa2.password;
    //delete objEmpresa.id;
    sheetEmpresa.push(objEmpresa2);
  });
  data?.eventoTable.map((objEvento: objEvento) => {
    const objEvento2 = objEvento;
    if (objEvento.Canceled === true) {
      eventosCancelados++;
    }
    delete objEvento2.isDeleted;
    delete objEvento2.Canceled;
    delete objEvento2.admitePostulaciones;
    delete objEvento2.id_empresa;
    delete objEvento2.empresa;
    sheetEventos.push(objEvento2);
  });
  data?.trabajadorTable.map((objTrabajador: objTrabajador) => {
    const objTrabajador2 = objTrabajador;
    delete objTrabajador2.resetContrasenaCode;
    delete objTrabajador2.nacimiento;
    delete objTrabajador2.imagen_dni;
    delete objTrabajador2.foto;
    delete objTrabajador2.cv;
    delete objTrabajador2.rut;
    delete objTrabajador2.certificado_bancario;
    delete objTrabajador2.password;
    delete objTrabajador2.isDeleted;
    delete objTrabajador2.isAdmin;

    sheetTrabajador.push(objTrabajador2);
  });

  if (isLoading) return <div>Cargando...</div>;
  console.log(data);
  return (
    <div>
      Tabla empresa
      <DatagridEmpresa dataEmpresas={data?.empresaTable} />
      Tabla eventos
      <DatagridEventos dataEventos={data?.eventoTable} />
      Tabla trabajadores
      <DatagridTrabajadores dataTrabajadores={data?.trabajadorTable} />
      Tabla trabajadoresEnEventos
      <DatagridTrabajadoresEnEventos
        dataTrabajadoresEnEventos={data?.trabajadoresEnEventosTable}
      />
      <button
        onClick={() => {
          downloadExcelAdmin(
            sheetTrabajador,
            sheetEmpresa,
            sheetEventos,
            sheetTrabajadoresEnEventos
          );
        }}
        className={buttonStyle + " ml-2"}
      >
        Descargar Excel
      </button>
      <br></br>
      Eventos Cancelados:{eventosCancelados}
      <br></br>
      <button className={buttonStyle + " ml-2"}>
        <Link href="/home">Volver a la home</Link>
      </button>
    </div>
  );
}
