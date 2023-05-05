import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { fetcherDashboard, dashboardUpdateEvento } from "./middlewareDashboard";
import useSWR from "swr";
import { objEvento } from "@/types/Types";

export default function DatagridEventos() {
  const [rowsEventos, setRowsEventos] = useState<{}[]>([]);
  const { isLoading, error, data } = useSWR(
    "/api/admin/evento",
    fetcherDashboard
  );
  useEffect(() => {
    if (data) {
      data?.map((objEvento: objEvento) => {
        setRowsEventos((prevState) => [...prevState, objEvento]);
      });
    }
  }, [data]);
  const columnsEvento: GridColDef[] = [
    {
      field: "nombre",
      headerName: "Nombre Evento",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "admitePostulaciones",
      headerName: "¿Admite postulaciones?",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["true", "false"],
    },
    {
      field: "id_empresa",
      headerName: "id empresa",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "fecha_inicio",
      headerName: "fecha inicio",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "fecha_final",
      headerName: "fecha final",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "lugar",
      headerName: "Lugar",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "cupos",
      headerName: "Cupos",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      type: "number",
      editable: true,
    },
    {
      field: "id",
      headerName: "UUID",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "isDeleted",
      headerName: "¿Borrado?",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["true", "false"],
    },
    {
      field: "perfil",
      headerName: "Perfil",
      editable: true,
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "pago",
      headerName: "Pago",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      type: "number",
      editable: true,
    },
    {
      field: "numeroPostulantes",
      headerName: "Numero de Postulantes",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      type: "number",
      editable: true,
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <button
          className="rounded-md bg-black text-white"
          onClick={() => {
            let idEvento = params.row.id;
            let admitePostulaciones = params.row.admitePostulaciones;
            let nombre = params.row.nombre;
            let fecha_inicio = params.row.fecha_inicio;
            let fecha_final = params.row.fecha_final;
            let lugar = params.row.lugar;
            let cupos = params.row.cupos;
            let perfil = params.row.perfil;
            let pago = params.row.pago;
            let numeroPostulantes = params.row.numeroPostulantes;
            let observaciones = params.row.observaciones;
            let isDeleted = params.row.isDeleted;
            dashboardUpdateEvento(
              idEvento,
              admitePostulaciones,
              nombre,
              fecha_inicio,
              fecha_final,
              lugar,
              cupos,
              perfil,
              pago,
              numeroPostulantes,
              observaciones,
              isDeleted
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
      rows={rowsEventos}
      columns={columnsEvento}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      checkboxSelection
    />
  );
}
