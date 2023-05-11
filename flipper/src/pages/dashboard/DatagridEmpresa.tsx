import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { aceptarORechazarEmpresa } from "../../services/servicesDashboard";
import { objEmpresa, PropsEmpresaGrid } from "@/types/Types";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

const DatagridEmpresa: React.FC<PropsEmpresaGrid> = ({ dataEmpresas }) => {
  const [rowsEmpresa, setRowsEmpresa] = useState<{}[]>([]);
  const { token } = useSesionUsuarioContext()

  useEffect(() => {
    if (dataEmpresas) {
      dataEmpresas?.map((objEmpresa: objEmpresa) => {
        setRowsEmpresa((prevState) => [...prevState, objEmpresa]);
      });
    }
  }, []);
  const columnsEmpresa: GridColDef[] = [
    {
      field: "isAdmin",
      headerName: "ES ADMIN",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "nombre",
      headerName: "NOMBRE DE LA EMPRESA",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "nombreceo",
      headerName: "NOMBRE DEL CEO",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "telefono",
      headerName: "TELEFONO",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "authorizedByAdmin",
      headerName: "AUTORIZACIÓN",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["true", "false"],
    },
    {
      field: "ciudad",
      headerName: "CIUDAD",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "direccion",
      headerName: "DIRECCION",
      flex: 0.2,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "email",
      headerName: "CORREO",
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
      headerName: "¿BANEADO?",
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
              isDeleted,
              token
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
        columns: {
          columnVisibilityModel: {
            id: false,
            //nombreceo: false
          },
        },
      }}
    />
  );
};

export default DatagridEmpresa;
