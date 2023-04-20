import type { NextApiRequest, NextApiResponse } from "next";
import { crearTrabajador } from "@/services/trabajadorController";

export interface DataTRegister {
  name: string;
  idType: string;
  idNumber: number;
  phone: string;
  email: string;
  password: string;
  nacimiento?: string | Date | null;
  genero?: string | null;
  ciudad?: string | null;
  direccion?: string | null;
  estatura?: number | null;
  talla_camiseta?: string | null;
  grupo_sanguineo?: string | null;
  imagen_dni?: string | null;
  foto?: string | null;
  cv?: string | null;
  rut?: string | null;
  certificado_bancario?: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataTRegister | string>
) {
  const body = req.body;

  try {
    if (req.method !== "POST") throw new Error("Method invalid");
    const nuevoTrabajador = await crearTrabajador(body);
    if (nuevoTrabajador)
      return res.status(200).send("Usuario Trabajador creado correctamente");
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
