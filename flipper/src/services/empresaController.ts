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
  const newEmpresaTelefono = await prisma.empresa.findFirst({
    where: {
      telefono: body.telefono,
    },
  });
  const newTrabajador = await prisma.trabajador.findFirst({
    where: {
      email: body.email,
    },
  });
  const newTrabajadorTelefono = await prisma.trabajador.findFirst({
    where: {
      phone: body.telefono,
    },
  });
  if (newEmpresa || newTrabajador)
    throw new Error("Cuenta ya creada con ese email");
  if (newEmpresaTelefono || newTrabajadorTelefono)
    throw new Error("Cuenta ya creada con ese telefono");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  body.password = hashedPassword;
  body.email = body?.email.toLowerCase();
  body.nombre = body.nombre.toLowerCase();
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
