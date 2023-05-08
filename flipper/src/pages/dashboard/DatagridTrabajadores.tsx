import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  fetcherDashboard,
  dashboardUpdateTrabajador,
} from "../../services/servicesDashboard";
import useSWR from "swr";
import { objTrabajador, PropsTrabajadorGrid } from "@/types/Types";

const DatagridTrabajadores: React.FC<PropsTrabajadorGrid> = ({
  dataTrabajadores,
}) => {
  const [rowsTrabajadores, setRowsTrabajadores] = useState<{}[]>([]);
  useEffect(() => {
    if (dataTrabajadores) {
      dataTrabajadores?.map((objTrabajador: objTrabajador) => {
        setRowsTrabajadores((prevState) => [...prevState, objTrabajador]);
      });
    }
  }, [dataTrabajadores]);
  const columnsTrabajador: GridColDef[] = [
    {
      field: "name",
      headerName: "NOMBRE TRABAJADOR",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "idType",
      headerName: "TIPO DE DOCUMENTO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "idNumber",
      headerName: "Nº DOCUMENTO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "number",
    },
    {
      field: "genero",
      headerName: "GENERO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "phone",
      headerName: "TELEFONO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "email",
      headerName: "CORREO",
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
      headerName: "¿BANEADO?",
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
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "direccion",
      headerName: "DIRECCION",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "estatura",
      headerName: "ESTATURA",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "number",
    },
    {
      field: "talla_camiseta",
      headerName: "TALLA CAMISETA",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "grupo_sanguineo",
      headerName: "GRUPO SANGUINEO",
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
      field: "nacimiento",
      headerName: "Nacimiento",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "date",
    },
    {
      field: "cv",
      headerName: "cv",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "rut",
      headerName: "rut",
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
            const name = params.row.name;
            const idType = params.row.idType;
            const idNumber = params.row.idNumber;
            const nacimiento = params.row.nacimiento;
            const genero = params.row.genero;
            const phone = params.row.phone;
            const email = params.row.email;
            const id = params.row.id;
            const isDeleted = params.row.isDeleted;
            const ciudad = params.row.ciudad;
            const direccion = params.row.direccion;
            const estatura = params.row.estatura;
            const talla_camiseta = params.row.talla_camiseta;
            const grupo_sanguineo = params.row.grupo_sanguineo;
            const imagen_dni = params.row.imagen_dni;
            const foto = params.row.foto;
            const cv = params.row.cv;
            const rut = params.row.rut;
            const certificado_bancario = params.row.certificado_bancario;
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
        columns: {
          columnVisibilityModel: {
            // Hide columns status and traderName, the other columns will remain visible
            imagen_dni: false,
            foto: false,
            nacimiento: false,
            cv: false,
            rut: false,
            certificado_bancario: false,
          },
        },
      }}
      checkboxSelection
    />
  );
};

export default DatagridTrabajadores;
