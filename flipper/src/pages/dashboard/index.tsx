import useSWR, { Fetcher } from "swr";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

interface objEmpresa {
  authorizedByAdmin: boolean;
  ciudad: string;
  direccion: string;
  email: string;
  id: string;
  isDeleted: boolean;
  nombre: string;
  nombreceo: string;
  password: string;
  telefono: string;
}

const fetcher: Fetcher<any, string> = (apiRoute) => {
  return fetch(apiRoute).then((res) => res.json());
};

const aceptarORechazarEmpresa = async (
  idEmpresa: string,
  statusNuevo: string | boolean
) => {
  if (statusNuevo === "VERDADERO") {
    statusNuevo = true;
  }
  if (statusNuevo === "FALSO") {
    statusNuevo = false;
  }
  return fetch("/api/empresa", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      realmethod: "ADMINPUT",
      idEmpresa,
      authorizedByAdmin: statusNuevo,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
    });
};
export default function Dashboard() {
  const [rows, setRows] = useState<{}[]>([]);
  const { isLoading, error, data } = useSWR("/api/empresa", fetcher);
  React.useEffect(() => {
    data?.map((objEmpresa: objEmpresa) => {
      setRows((prevState) => [...prevState, objEmpresa]);
    });
  }, [data]);
  const columns: GridColDef[] = [
    {
      field: "nombre",
      headerName: "Nombre Empresa",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "nombreceo",
      headerName: "Nombre CEO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "telefono",
      headerName: "Telefono",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "authorizedByAdmin",
      headerName: "Autorizado",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["VERDADERO", "FALSO"],
    },
    {
      field: "ciudad",
      headerName: "Ciudad",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "direccion",
      headerName: "Direccion",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.2,
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
      headerName: "Borrado?",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
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
            console.log(idEmpresa);
            let statusNuevo = params.row.authorizedByAdmin;
            aceptarORechazarEmpresa(idEmpresa, statusNuevo);
          }}
        >
          Actualizar
        </button>
      ),
    },
  ];
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        checkboxSelection
      />
    </div>
  );
}
