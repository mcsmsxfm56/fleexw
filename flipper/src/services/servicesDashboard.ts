import { Fetcher } from "swr";

export const fetcherDashboard = async (apiRoute: any, token: any) => {
  const res = await fetch(apiRoute, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
  return res;
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
  isDeleted: string | boolean,
  token: string
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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
  isDeleted: string | boolean,
  token: string
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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

export const dashboardUpdateTrabajador = async (
  name: string,
  idType: string,
  idNumber: number,
  nacimiento: Date,
  genero: string,
  phone: string,
  email: string,
  id: string,
  isDeleted: string | boolean,
  ciudad: string,
  direccion: string,
  estatura: number,
  talla_camiseta: string,
  grupo_sanguineo: string,
  imagen_dni: string,
  foto: string,
  cv: string,
  rut: string,
  certificado_bancario: string,
  token: string
) => {
  if (isDeleted === "true") {
    isDeleted = true;
  }
  if (isDeleted === "false") {
    isDeleted = false;
  }
  return fetch("/api/admin/trabajador", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
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
      certificado_bancario,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    });
};

export const dashboardUpdateTrabajadorEnEventos = async (
  status: string,
  notificacionVista: string | boolean,
  eventoId: string,
  trabajadorId: string,
  token: string
) => {
  if (notificacionVista === "true") {
    notificacionVista = true;
  }
  if (notificacionVista === "false") {
    notificacionVista = false;
  }
  return fetch("/api/trabajadoreseneventos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
      notificacionVista,
      eventoId,
      trabajadorId,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    });
};
