import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { DataTRegister } from "@/pages/api/users/register/trabajador";

interface bodyCrear {
  name: string;
  idType: string;
  idNumber: number;
  phone: string;
  email: string;
  password: string;
}
export const buscarTrabajador = async (id: string) => {
  if (!id) throw new Error("No existe trabajador con ese id");
  const trabajador = await prisma.trabajador.findUnique({
    where: { id: id },
  });
  if (!trabajador) throw new Error("No se pudo encontrar el trabajador");
  return trabajador;
};

export const crearTrabajador = async (body: bodyCrear) => {
  if (
    !body.name ||
    !body.idType ||
    !body.idNumber ||
    !body.phone ||
    !body.email ||
    !body.password
  )
    throw new Error("Faltan campos por completar");
  const newTrabajador = await prisma.trabajador.findFirst({
    where: {
      email: body.email,
    },
  });
  const newEmpresa = await prisma.empresa.findFirst({
    where: {
      email: body.email,
    },
  });
  if (newTrabajador && body.phone === newTrabajador.phone) {
    throw new Error("Trabajador ya creado con ese telefono");
  }
  if (newTrabajador || newEmpresa) {
    throw new Error("Cuenta ya creada con ese email");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  body.password = hashedPassword;
  body.email = body?.email.toLowerCase();
  const newObj = {
    name: body.name,
    idType: body.idType,
    idNumber: body.idNumber,
    email: body.email,
    phone: body.phone,
    password: body.password,
  };
  const nuevoT = await prisma.trabajador.create({
    data: newObj,
  });
  if (!nuevoT) throw new Error("No se pudo crear el usuario");
  return nuevoT;
};

export const eliminarTrabajador = async (id: string) => {
  if (!id) throw new Error("id inexistente");
  const trabajador = await prisma.trabajador.update({
    where: { id: id },
    data: {
      isDeleted: true,
    },
  });
  return trabajador;
};
