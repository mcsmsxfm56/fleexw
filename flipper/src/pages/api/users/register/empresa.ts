import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

interface DataRegister {
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
    if (req.method !== "POST") throw new Error("Method invalid");
    const newEmpresa = await prisma.empresa.findFirst({
      where: {
        email: body.email,
      },
    });
    if (newEmpresa) throw new Error("Empresa ya creada con ese email");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    body.email = body?.email.toLowerCase();
    const newObj: DataRegister = {
      nombre: body.nombre,
      nombreceo: body.nombreceo,
      email: body.email,
      ciudad: body.ciudad,
      direccion: body.direccion,
      telefono: body.telefono,
      password: body.password,
    };
    const newEmp: DataRegister = await prisma.empresa.create({
      data: newObj,
    });
    if (!newEmp) throw new Error("No se pudo crear el usuario");
    return res.status(200).send("Usuario Empresa creado correctamente");
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
