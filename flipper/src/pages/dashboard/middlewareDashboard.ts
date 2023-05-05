import { Fetcher } from "swr";
import { GridColDef } from "@mui/x-data-grid";

export const fetcherDashboard: Fetcher<any, string> = (apiRoute) => {
  return fetch(apiRoute).then((res) => res.json());
};

export const aceptarORechazarEmpresa = async (
  idEmpresa: string,
  authorizedByAdmin: string | boolean,
  nombre: string,
  nombreceo: string,
  telefono: string,
  ciudad: string,
  direccion: string,
  email: string,
  isDeleted: string | boolean
) => {
  if (authorizedByAdmin === "true") {
    authorizedByAdmin = true;
  }
  if (authorizedByAdmin === "false") {
    authorizedByAdmin = false;
  }
  if (isDeleted === "true") {
    isDeleted = true;
  }
  if (isDeleted === "false") {
    isDeleted = false;
  }
  return fetch("/api/admin/empresa", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idEmpresa,
      authorizedByAdmin,
      nombre,
      nombreceo,
      telefono,
      ciudad,
      direccion,
      email,
      isDeleted,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    });
};

export const dashboardUpdateEvento = async (
  idEvento: string,
  admitePostulaciones: string | boolean,
  nombre: string,
  fecha_inicio: string,
  fecha_final: string,
  lugar: string,
  cupos: number,
  perfil: string,
  pago: number,
  numeroPostulantes: number,
  observaciones: string,
  isDeleted: string | boolean
) => {
  if (admitePostulaciones === "true") {
    admitePostulaciones = true;
  }
  if (admitePostulaciones === "false") {
    admitePostulaciones = false;
  }
  if (isDeleted === "true") {
    isDeleted = true;
  }
  if (isDeleted === "false") {
    isDeleted = false;
  }
  return fetch("/api/admin/evento", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    });
};

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
    headerName: "Borrado?",
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
];

const columnsTrabajadoresEnEventos: GridColDef[] = [
  {
    field: "eventoId",
    headerName: "ID Evento",
    flex: 0.2,
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    editable: true,
  },
  {
    field: "trabajadorId",
    headerName: "ID Trabajador",
    editable: true,
    flex: 0.2,
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "status",
    headerName: "Status",
    editable: true,
    flex: 0.2,
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
  },
  {
    field: "notificacionVista",
    headerName: "Notificacion Vista",
    flex: 0.2,
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    editable: true,
    type: "singleSelect",
    valueOptions: ["VERDADERO", "FALSO"],
  },
];
