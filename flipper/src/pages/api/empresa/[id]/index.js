import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    let user = await prisma.empresa.findUnique({
      where: {
        nombre: id,
      },
      include: {
        eventos: {
          include: { trabajadores: { include: { trabajadores: true } } },
        },
      },
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Empresa no encontrada");
    }
  } else if (req.method === "DELETE") {
    const { nombre } = req.query;
    if (typeof nombre === "string") {
      const updateUser = await prisma.empresa.update({
        where: {
          nombre: nombre,
        },
        data: {
          isDeleted: true,
        },
      });
    }
    res.status(200).send("DELETE");
  } else if (req.method === "PUT") {
    const { authorization } = req.headers;
    const idEmpresa = req.query.nombre;

    if (authorization === undefined || authorization.length !== 204) {
      return res.status(400).json({ message: "Autorizacion rechazada" });
    }

    const empresaFound = await prisma.empresa.findUnique({
      where: { id: idEmpresa },
    });

    if (!empresaFound) {
      return res.status(404).json({ message: "empresa inexistente" });
    }

    let token = null;
    if (
      authorization &&
      authorization.toLocaleLowerCase().startsWith("bearer")
    ) {
      token = authorization.split(" ")[1]; // obtenemos el token del authorization '[bearer] [token]'
    }
    if (!token) {
      return res.status(401).send("Token inexistente o invalido");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const { id } = decodedToken;

    if (decodedToken) {
      const empresaUpdate = await prisma.empresa.update({
        where: { id: id },
        data: {
          nombre: name,
          nombreceo,
          email,
          ciudad,
          direccion,
          telefono,
        },
      });
      return res.status(200).json(empresaUpdate);
    }

    // if (Object.keys(req.body).length === 0) {
    //   res.status(400).send("Objeto vacio");
    // }

    // if (typeof isDeleted == "boolean") {
    //   //console.log(req.query);
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       isDeleted: isDeleted,
    //     },
    //   });
    //   res.status(200).send("PUT");
    // }
    // if (typeof name === "string") {
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       nombre: name,
    //     },
    //   });
    // }
    // if (typeof nombreceo === "string") {
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       nombreceo: nombreceo,
    //     },
    //   });
    // }
    // if (typeof email === "string") {
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       email,
    //     },
    //   });
    // }
    // if (typeof ciudad === "string") {
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       ciudad: ciudad,
    //     },
    //   });
    // }
    // if (typeof direccion === "string") {
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       direccion: direccion,
    //     },
    //   });
    // }
    // if (telefono !== null) {
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       telefono: telefono,
    //     },
    //   });
    // }
    //res.status(200).json("check status");
  }
}
