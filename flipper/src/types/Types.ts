// Interfaz para los datos de registro de Empresa
export interface CompanyData{
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
export interface WorkerData{
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