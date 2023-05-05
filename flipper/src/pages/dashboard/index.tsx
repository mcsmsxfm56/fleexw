import DatagridEmpresa from "./DatagridEmpresa";
import DatagridEventos from "./DatagridEventos";
import DatagridTrabajadores from "./DatagridTrabajadores";

export default function Dashboard() {
  return (
    <div>
      Tabla empresa
      <DatagridEmpresa />
      Tabla eventos
      <DatagridEventos />
      Tabla trabajadores
      <DatagridTrabajadores />
    </div>
  );
}
