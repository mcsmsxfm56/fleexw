import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

interface empresa {
  nombre: string;
  nombreceo: string;
  email: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  password: string | undefined;
  id: string;
}
interface putEmpresa {
  realmethod?: string;
  name?: string;
  nombreceo?: string;
  email?: string;
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  idEmpresa?: string;
  authorizedByAdmin?: boolean;
  //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
}
interface token {
  id: string;
  email: string;
  iat: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json("Token inexistente o invalido");
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  if (decodedToken) {
    if (req.method === "GET") {
      const user = await prisma.empresa.findMany();
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(400)
          .json("No hay empresas, hay que esperar a que se registren");
      }
    }

    if (req.method === "PUT" && req.body.realmethod === "GET") {
      try {
        const idEmpresa: string = req.body.idEmpresa as string;
        if (req.body.function === "misEventos") {
          let presentDate = new Date();
          presentDate.setHours(presentDate.getHours() - 5);
          let user = await prisma.empresa.findUnique({
            where: { id: idEmpresa },
            include: {
              eventos: {
                where: {
                  fecha_inicio: { gte: presentDate },
                },
                include: {
                  trabajadores: { include: { trabajadores: true } },
                  empresa: true,
                },
              },
            },
          });
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(400).json("Empresa no encontrada");
          }
        }
        if (req.body.function === "historial") {
          let presentDate = new Date();
          presentDate.setHours(presentDate.getHours() - 5);
          let user = await prisma.empresa.findUnique({
            where: { id: idEmpresa },
            include: {
              eventos: {
                where: {
                  fecha_inicio: { lte: presentDate },
                },
                include: {
                  trabajadores: { include: { trabajadores: true } },
                  empresa: true,
                },
              },
            },
          });
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(400).json("Empresa no encontrada");
          }
        }
      } catch (error: unknown) {
        return res.status(400).json(error);
      }
    }
    if (req.method === "PUT" && req.body.realmethod === "ADMINPUT") {
      let { idEmpresa, authorizedByAdmin } = req.body;
      const empresaUpdate = await prisma.empresa.update({
        where: { id: idEmpresa },
        data: {
          authorizedByAdmin,
        },
      });
      return res.status(200).json({ message: "Empresa autorizada con exito" });
    }
    if (req.method === "PUT" && req.body.realmethod === "PUT") {
      let {
        realmethod,
        name,
        nombreceo,
        email,
        ciudad,
        direccion,
        telefono,
        idEmpresa,
      }: //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
      putEmpresa = req.body;
      if (authorization === undefined) {
        return res.status(400).json({ message: "Autorizacion rechazada" });
      }
      // const empresaFound = await prisma.empresa.findUnique({
      //   where: { id: idEmpresa },
      // });

      // if (!empresaFound) {
      //   return res.status(404).json({ message: "empresa inexistente" });
      // }

      if (decodedToken) {
        const { id } = decodedToken as token;
        const empresaUpdate = await prisma.empresa.update({
          where: { id: id },
          data: {
            nombre: null ?? name,
            nombreceo: null ?? nombreceo,
            email: null ?? email,
            ciudad: null ?? ciudad,
            direccion: null ?? direccion,
            telefono: null ?? telefono,
          } as putEmpresa,
        });
        return res.status(200).json({
          message: "Datos modificados con exito",
          empresaUpdate,
        });
      }
      return res.status(400).json("No se pudo actualizar la informacion");
    }
  }
}
/*CODIGO DE ANTIGUO [nombre].ts, lo dejo por que podemos reutilizarlo a futuro
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

interface putEmpresa {
  name?: string;
  nombreceo?: string;
  email?: string;
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
}
interface token {
  id: string;
  email: string;
  iat: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
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
    res.status(200).json("DELETE");
  } else if (req.method === "PUT") {
    const { authorization } = req.headers;
    const idEmpresa: string = req.query.nombre as string;

    if (authorization === undefined || authorization.length !== 204) {
      return res.status(400).json({ message: "Autorizacion rechazada" });
    }

    const empresaFound = await prisma.empresa.findUnique({
      where: { id: idEmpresa },
    });

    if (!empresaFound) {
      return res.status(404).json({ message: "empresa inexistente" });
    }

    let {
      name,
      nombreceo,
      email,
      ciudad,
      direccion,
      telefono,
    }: //password?: string; no implementado por que se puede lograr lo mismo con recuperar password
    putEmpresa = req.body;

    let token = null;
    if (
      authorization &&
      authorization.toLocaleLowerCase().startsWith("bearer")
    ) {
      token = authorization.split(" ")[1]; // obtenemos el token del authorization '[bearer] [token]'
    }
    if (!token) {
      return res.status(401).json("Token inexistente o invalido");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
    const { id } = decodedToken as token;

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
        } as putEmpresa,
      });
      return res.status(200).json(empresaUpdate);
    }

    // if (Object.keys(req.body).length === 0) {
    //   res.status(400).json("Objeto vacio");
    // }

    // if (typeof isDeleted == "boolean") {
    //   const updateEvent = await prisma.empresa.update({
    //     where: {
    //       nombre: nombre,
    //     },
    //     data: {
    //       isDeleted: isDeleted,
    //     },
    //   });
    //   res.status(200).json("PUT");
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
*/
