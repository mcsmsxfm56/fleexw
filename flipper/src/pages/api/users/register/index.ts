import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

interface DataRegister {
  id?: string;
  nombre: string;
  nombreceo: string;
  email: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  password: string;
}
interface userToken {
  email: string;
  nombre: string;
  nombreceo: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  try {
    if (req.method === "GET") {
      const find = await prisma.Empresa.findMany();
      if (find) {
        return res.status(200).send(find);
      }
    } else if (req.method === "POST") {
      const newEmpresa = await prisma.Empresa.findFirst({
        where: {
          email: body.email,
        },
      });
      if (newEmpresa) throw new Error("Empresa ya creada con ese email");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      body.password = hashedPassword;
      const newObj: DataRegister = {
        nombre: body.nombre,
        nombreceo: body.nombre,
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
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
