import prisma from "../../../../../lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

interface Evento {
  id: String;
  empresa: String; // un evento solo tiene una empresa
  nombre: String;
  id_empresa: String;
  fecha: Date; //indica que al guardar en db lo almacena como datatype date
  hora_inicio: Date;
  hora_final: Date;
  lugar: String;
  cupos: number;
  perfil: String;
  pago: number;
  observaciones: String;
}

interface DataRegister {
  nombre: String;
  nombreceo: String;
  email: String;
  ciudad: String;
  direccion: String;
  telefono: String;
  password: String;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRegister>
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
      const newObj: DataRegister = {
        nombre: body.nombre,
        nombreceo: body.nombre,
        email: body.email,
        ciudad: body.ciudad,
        direccion: body.direccion,
        telefono: body.telefono,
        password: body.password,
      };
      const newEmp = await prisma.empresa.create({ data: newObj });
      return res.status(200).send(newEmp);
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
