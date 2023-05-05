import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  fetcherDashboard,
  aceptarORechazarEmpresa,
} from "./middlewareDashboard";
import useSWR from "swr";
import { objEmpresa } from "@/types/Types";

export default function DatagridEmpresa() {
  const [rowsEmpresa, setRowsEmpresa] = useState<{}[]>([]);
  const { isLoading, error, data } = useSWR(
    "/api/admin/empresa",
    fetcherDashboard
  );
  useEffect(() => {
    if (data) {
      data?.map((objEmpresa: objEmpresa) => {
        setRowsEmpresa((prevState) => [...prevState, objEmpresa]);
      });
    }
  }, [data]);
  const columnsEmpresa: GridColDef[] = [
    {
      field: "nombre",
      headerName: "Nombre Empresa",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "nombreceo",
      headerName: "Nombre CEO",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "telefono",
      headerName: "Telefono",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "authorizedByAdmin",
      headerName: "¿Autorizado?",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["true", "false"],
    },
    {
      field: "ciudad",
      headerName: "Ciudad",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "direccion",
      headerName: "Direccion",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
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
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <button
          className="rounded-md bg-black text-white"
          onClick={() => {
            let idEmpresa = params.row.id;
            let authorizedByAdmin = params.row.authorizedByAdmin;
            let nombre = params.row.nombre;
            let nombreceo = params.row.nombreceo;
            let telefono = params.row.telefono;
            let ciudad = params.row.ciudad;
            let direccion = params.row.direccion;
            let email = params.row.email;
            let isDeleted = params.row.isDeleted;
            aceptarORechazarEmpresa(
              idEmpresa,
              authorizedByAdmin,
              nombre,
              nombreceo,
              telefono,
              ciudad,
              direccion,
              email,
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
      rows={rowsEmpresa}
      columns={columnsEmpresa}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      checkboxSelection
    />
  );
}
