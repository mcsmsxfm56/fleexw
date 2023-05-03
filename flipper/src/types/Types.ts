// Interfaz para los datos de registro de Empresa
export interface CompanyData {
  nombre: string;
  nombreceo: string;
  email: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  password: string;
}

// Interfaz para los datos de registro de Trabajador
export interface WorkerRegisterData {
  phone: string;
  email: string;
  password: string;
  name: string;
  idType: string;
  idNumber: string;
}

// Interfaz para los datos completos de Trabajador
export interface WorkerData {
  email: string;
  name: string;
  password: string;
  phone: string;
  ciudad: string;
  direccion: string;
  estatura: number;
  nacimiento: Date | null;
  genero: string | null;
  talla_camiseta: string | null;
  grupo_sanguineo: string | null;
  imagen_dni: string | null;
  foto: string | null;
  cv: string | null;
  rut: string | null;
  certificado_bancario: string | null;
  idNumber: number | null;
  idType: string | null;
}

export interface Trabajadores extends WorkerData {
  id: string,
}

export interface TrabajadorStatus {
  eventoId: string,
  trabajadorId: string,
  status: string,
  trabajadores: Trabajadores
}

export interface DetalleEvento {
  id: string,
  isDeleted: boolean,
  nombre: string,
  id_empresa: string,
  fecha_inicio: string,
  fecha_final: string,
  lugar: string,
  cupos: number,
  perfil: string,
  pago: number,
  observaciones: string,
  trabajadores: TrabajadorStatus[]
  admitePostulaciones: boolean
}

//Interfaz para crear eventos
export interface createEvent {
  id_empresa: string;
  nombre: string;
  fecha_inicio: string;
  fecha_final: string;
  lugar: string;
  cupos: number;
  perfil: string;
  pago: number;
  observaciones: string;
}


export interface ShowElementsEmpresa {
  showEventos: boolean,
  showHistorial: boolean,
  showCrear: boolean,
  showPostulaciones: boolean,
  showPerfil: boolean,
}

export interface ShowElementsTrabajador {
  showEventosTrabajador: boolean,
  showEventosConfirmadosTrabajador: boolean,
  showHistorialTrabajador: boolean,
  showPerfilTrabajador: boolean,
}

// ----- Notificaciones -----
export type NotificationSingle = {
  eventoId: string;
  trabajadorId: string;
  status: string;
  evento: {
    nombre: string;
    pago: number;
    fecha_inicio: Date;
    fecha_finalizacion: Date;
    lugar: string;
    observaciones: string;
  };
};

export type NotificationList = NotificationSingle[];