import { DataRegister } from "@/pages/api/users/register/empresa";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export const crearEmpresa = async (body: DataRegister) => {
  if (
    !body.nombre ||
    !body.nombreceo ||
    !body.email ||
    !body.ciudad ||
    !body.telefono ||
    !body.direccion ||
    !body.password
  )
    throw new Error("Faltan campos por completar");

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
  const newObj = {
    nombre: body.nombre,
    nombreceo: body.nombreceo,
    email: body.email,
    ciudad: body.ciudad,
    direccion: body.direccion,
    telefono: body.telefono,
    password: body.password,
  };
  const newEmp = await prisma.empresa.create({
    data: newObj,
  });
  if (!newEmp) throw new Error("No se pudo crear el usuario");
  return newEmp;
};
