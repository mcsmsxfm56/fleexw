import DatagridEmpresa from "./DatagridEmpresa";
import DatagridEventos from "./DatagridEventos";
import DatagridTrabajadores from "./DatagridTrabajadores";
import downloadExcel from "../../components/Excel/generateExcel";
import useSWR from "swr";
import { fetcherDashboard } from "./middlewareDashboard";

export default function Dashboard() {
  const { isLoading, error, data } = useSWR("/api/admin", fetcherDashboard);
  console.log(data); //{empresaTable: [{objEmpresa}], eventoTable: [{objEvento}], trabajadorTable: [{objTrabajador}]}
  const sheetTrabajador = [
    {
      column1: 1,
      temaIndicador: "Indian",
      codigo: "001",
      observaciones: "Interactions Specialist tertiary Regional Tennessee",
      activo: "SI",
      urlImagen: "http://placeimg.com/640/480",
      color: "cyan",
      createdAt: "2022-01-26T18:48:36.002Z",
    },
    {
      column1: 2,
      temaIndicador: "Indian",
      codigo: "001",
      observaciones: "Interactions Specialist tertiary Regional Tennessee",
      activo: "SI",
      urlImagen: "http://placeimg.com/640/480",
      color: "cyan",
      createdAt: "2022-01-26T18:48:36.002Z",
    },
  ];
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
          downloadExcel(sheetTrabajador);
        }}
      >
        Descargar Excel
      </button>
    </div>
  );
}
