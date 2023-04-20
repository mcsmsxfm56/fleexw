import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

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
    if (
      !body.name ||
      !body.idType ||
      !body.idNumber ||
      !body.email ||
      !body.phone ||
      !body.password
    )
      throw new Error("Faltan campos por completar");
    if (req.method !== "POST") throw new Error("Method invalid");
    const newTrabajador = await prisma.trabajador.findFirst({
      where: {
        email: body.email,
      },
    });
    if (body.phone === newTrabajador?.phone)
      throw new Error("Trabajador ya creado con ese telefono");
    if (newTrabajador) throw new Error("Trabajador ya creado con ese email");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    body.email = body?.email.toLowerCase();
    const newObj: DataTRegister = {
      name: body.name,
      idType: body.idType,
      idNumber: body.idNumber,
      email: body.email,
      phone: body.phone,
      password: body.password,
    };
    const newEmp = await prisma.trabajador.create({
      data: newObj,
    });
    if (!newEmp) throw new Error("No se pudo crear el usuario");
    return res.status(200).send("Usuario Trabajador creado correctamente");
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
