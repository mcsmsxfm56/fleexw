import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { crearEmpresa } from "@/services/empresaController";

export interface DataRegister {
  nombre: string;
  nombreceo: string;
  email: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRegister | string>
) {
  const body = req.body;

  try {
    if (req.method !== "POST") throw new Error("Metodo invalido");
    const crearEmp = await crearEmpresa(body);
    if (crearEmp)
      return res.status(200).send("Usuario Empresa creado correctamente");
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
