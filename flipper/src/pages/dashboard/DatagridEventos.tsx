import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { dashboardUpdateEvento } from "../../services/servicesDashboard";
import { objEvento, PropsEventoGrid } from "@/types/Types";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

const DatagridEventos: React.FC<PropsEventoGrid> = ({ dataEventos }) => {
  const [rowsEventos, setRowsEventos] = useState<{}[]>([]);

  const { token } = useSesionUsuarioContext();

  useEffect(() => {
    if (dataEventos) {
      dataEventos?.map((objEvento: objEvento) => {
        objEvento.empresaNombre = objEvento.empresa?.nombre;
        setRowsEventos((prevState) => [...prevState, objEvento]);
      });
    }
  }, [dataEventos]);

  //agregar EMPRESA DEL EVENTO
  const columnsEvento: GridColDef[] = [
    {
      field: "nombre",
      headerName: "NOMBRE DEL EVENTO",
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
      field: "empresaNombre",
      headerName: "EMPRESA DEL EVENTO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "fecha_inicio",
      headerName: "FECHA INICIO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "fecha_final",
      headerName: "FECHA FIN",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "lugar",
      headerName: "LUGAR",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
    },
    {
      field: "cupos",
      headerName: "CUPOS",
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
      headerName: "¿BANEADO?",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      editable: true,
      type: "singleSelect",
      valueOptions: ["true", "false"],
    },
    {
      field: "perfil",
      headerName: "PERFIL",
      editable: true,
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "pago",
      headerName: "PAGO",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      type: "number",
      editable: true,
    },
    {
      field: "numeroPostulantes",
      headerName: "Nº POSTULADOS",
      flex: 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      type: "number",
      editable: true,
    },
    {
      field: "observaciones",
      headerName: "OBSERVACIONES",
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
            const idEvento = params.row.id;
            const admitePostulaciones = params.row.admitePostulaciones;
            const nombre = params.row.nombre;
            const fecha_inicio = params.row.fecha_inicio;
            const fecha_final = params.row.fecha_final;
            const lugar = params.row.lugar;
            const cupos = params.row.cupos;
            const perfil = params.row.perfil;
            const pago = params.row.pago;
            const numeroPostulantes = params.row.numeroPostulantes;
            const observaciones = params.row.observaciones;
            const isDeleted = params.row.isDeleted;
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
      rows={rowsEventos}
      columns={columnsEvento}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
        columns: {
          columnVisibilityModel: {
            // Hide columns status and traderName, the other columns will remain visible
            admitePostulaciones: false,
            id_empresa: false,
            id: false,
          },
        },
      }}
    />
  );
};

export default DatagridEventos;
