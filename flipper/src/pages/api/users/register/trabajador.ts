import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

interface DataTRegister {
  name: string;
  idType: string;
  idNumber: number;
  phone: string;
  email: string;
  password: string;
  nacimiento?: string | Date;
  genero?: string;
  ciudad?: string;
  direccion?: string;
  estatura?: number;
  talla_camiseta?: string;
  grupo_sanguineo?: string;
  imagen_dni?: string;
  foto?: string;
  cv?: string;
  rut?: string;
  certificado_bancario?: string;
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
