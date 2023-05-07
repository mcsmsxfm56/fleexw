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

export default function Dashboard() {
  const { isLoading, error, data } = useSWR("/api/admin", fetcherDashboard);
  let eventosCancelados = 0;

  const sheetTrabajador: objTrabajador[] = [];
  const sheetEmpresa: objEmpresa[] = [];
  const sheetEventos: objEvento[] = [];
  const sheetTrabajadoresEnEventos: objtrabajadoresEnEventos[] = [];

  data?.trabajadoresEnEventosTable.map(
    (objtrabajadoresEnEventos: objtrabajadoresEnEventos) => {
      sheetTrabajadoresEnEventos.push(objtrabajadoresEnEventos);
    }
  );
  data?.empresaTable.map((objEmpresa: objEmpresa) => {
    sheetEmpresa.push(objEmpresa);
  });
  data?.eventoTable.map((objEvento: objEvento) => {
    sheetEventos.push(objEvento);
    if (objEvento.Canceled === true) {
      eventosCancelados++;
    }
  });
  data?.trabajadorTable.map((objTrabajador: objTrabajador) => {
    sheetTrabajador.push(objTrabajador);
  });

  if (isLoading) return <div>Cargando...</div>;
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
      >
        Descargar Excel
      </button>
      <br></br>
      Eventos Cancelados:{eventosCancelados}
    </div>
  );
}
