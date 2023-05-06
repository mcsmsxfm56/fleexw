import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  fetcherDashboard,
  dashboardUpdateTrabajador,
} from "./middlewareDashboard";
import useSWR from "swr";
import { objTrabajador } from "@/types/Types";

export default function DatagridTrabajadores() {
  const [rowsTrabajadores, setRowsTrabajadores] = useState<{}[]>([]);
  const { isLoading, error, data } = useSWR(
    "/api/admin/trabajador",
    fetcherDashboard
  );
  useEffect(() => {
    if (data) {
      data?.map((objTrabajador: objTrabajador) => {
        setRowsTrabajadores((prevState) => [...prevState, objTrabajador]);
      });
    }
  }, [data]);
  const columnsTrabajador: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre Trabajador",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "idType",
      headerName: "Tipo ID",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "idNumber",
      headerName: "Numero ID",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "number",
    },
    {
      field: "nacimiento",
      headerName: "Nacimiento",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "date",
    },
    {
      field: "genero",
      headerName: "Genero",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "phone",
      headerName: "Telefono",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
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
      field: "ciudad",
      headerName: "Ciudad",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "direccion",
      headerName: "Direccion",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "estatura",
      headerName: "Estatura",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "number",
    },
    {
      field: "talla_camiseta",
      headerName: "Talla camiseta",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "grupo_sanguineo",
      headerName: "Grupo sanguineo",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "imagen_dni",
      headerName: "Imagen dni",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "foto",
      headerName: "Foto",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "cv",
      headerName: "CV",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "rut",
      headerName: "RUT",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "certificado_bancario",
      headerName: "Certificado Bancario",
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
            let name = params.row.name;
            let idType = params.row.idType;
            let idNumber = params.row.idNumber;
            let nacimiento = params.row.nacimiento;
            let genero = params.row.genero;
            let phone = params.row.phone;
            let email = params.row.email;
            let id = params.row.id;
            let isDeleted = params.row.isDeleted;
            let ciudad = params.row.ciudad;
            let direccion = params.row.direccion;
            let estatura = params.row.estatura;
            let talla_camiseta = params.row.talla_camiseta;
            let grupo_sanguineo = params.row.grupo_sanguineo;
            let imagen_dni = params.row.imagen_dni;
            let foto = params.row.foto;
            let cv = params.row.cv;
            let rut = params.row.rut;
            let certificado_bancario = params.row.certificado_bancario;
            dashboardUpdateTrabajador(
              name,
              idType,
              idNumber,
              nacimiento,
              genero,
              phone,
              email,
              id,
              isDeleted,
              ciudad,
              direccion,
              estatura,
              talla_camiseta,
              grupo_sanguineo,
              imagen_dni,
              foto,
              cv,
              rut,
              certificado_bancario
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
      rows={rowsTrabajadores}
      columns={columnsTrabajador}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      checkboxSelection
    />
  );
}
