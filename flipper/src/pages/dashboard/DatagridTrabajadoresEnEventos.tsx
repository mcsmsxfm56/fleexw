import { PropsTrabajadoresEnEventosGrid } from "@/types/Types";
import { useState, useEffect } from "react";
import { objtrabajadoresEnEventos } from "@/types/Types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dashboardUpdateTrabajadorEnEventos } from "@/services/servicesDashboard";
const DatagridTrabajadoresEnEventos: React.FC<
  PropsTrabajadoresEnEventosGrid
> = ({ dataTrabajadoresEnEventos }) => {
  const [rowsTrabajadoresEnEventos, setRowsTrabajadoresEnEventos] = useState<
    {}[]
  >([]);
  let id = 0;
  useEffect(() => {
    if (dataTrabajadoresEnEventos) {
      dataTrabajadoresEnEventos?.map(
        (objtrabajadoresEnEventos: objtrabajadoresEnEventos) => {
          objtrabajadoresEnEventos.id = id++;
          setRowsTrabajadoresEnEventos((prevState) => [
            ...prevState,
            objtrabajadoresEnEventos,
          ]);
        }
      );
    }
  }, [dataTrabajadoresEnEventos]);
  const columnsTrabajadoresEnEventos: GridColDef[] = [
    {
      field: "eventoId",
      headerName: "id evento",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "trabajadorId",
      headerName: "id trabajador",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "status",
      headerName: "status",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "notificacionVista",
      headerName: "notificacionVista",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["true", "false"],
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <button
          className="rounded-md bg-black text-white"
          onClick={() => {
            const status = params.row.status;
            const notificacionVista = params.row.notificacionVista;
            const eventoId = params.row.eventoId;
            const trabajadorId = params.row.trabajadorId;
            dashboardUpdateTrabajadorEnEventos(
              status,
              notificacionVista,
              eventoId,
              trabajadorId
            );
          }}
        >
          Actualizar
        </button>
      ),
    },
  ];
  return (
    <DataGrid
      rows={rowsTrabajadoresEnEventos}
      columns={columnsTrabajadoresEnEventos}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
    />
  );
};

export default DatagridTrabajadoresEnEventos;
