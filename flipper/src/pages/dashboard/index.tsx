import DatagridEmpresa from "./DatagridEmpresa";
import DatagridEventos from "./DatagridEventos";
import DatagridTrabajadores from "./DatagridTrabajadores";
import { downloadExcelAdmin } from "../../components/Excel/generateExcel";
import useSWR from "swr";
import { fetcherDashboard } from "../../services/servicesDashboard";
import { objEmpresa, objEvento, objTrabajador } from "@/types/Types";

export default function Dashboard() {
  const { isLoading, error, data } = useSWR("/api/admin", fetcherDashboard);
  const sheetTrabajador: objTrabajador[] = [];
  const sheetEmpresa: objEmpresa[] = [];
  const sheetEventos: objEvento[] = [];
  data?.empresaTable.map((objEmpresa: objEmpresa) => {
    sheetEmpresa.push(objEmpresa);
  });
  data?.eventoTable.map((objEvento: objEvento) => {
    sheetEventos.push(objEvento);
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
      <button
        onClick={() => {
          downloadExcelAdmin(sheetTrabajador, sheetEmpresa, sheetEventos);
        }}
      >
        Descargar Excel
      </button>
    </div>
  );
}
