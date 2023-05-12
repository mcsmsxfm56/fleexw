import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { recuperarContrasenaNotification, transport } from "@/services/transportEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY as string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT" && req.body.realmethod === "GET") {
        const email: string = req.body.email;


        if (!email) {
            return res.status(400).json("Email requerido")
        }
        try {
            const trabajadorEncontrado: any = await prisma.trabajador.findFirst({
                where: { email },
            });
            const empresaEncontrada: any = await prisma.empresa.findFirst({
                where: { email },
            });
            const usuarioEncontrado = empresaEncontrada || trabajadorEncontrado;

            if (!usuarioEncontrado) {
                return res.status(404).json("no se encontro el usuario");
            }
            //creacione del token para cambiar la contraseña

            const resetContrasenaCode = jwt.sign(
                {
                    email
                },
                secretKey
            );

            if (empresaEncontrada) {
                const idEmpresa = empresaEncontrada.id
                await prisma.empresa.update({
                    where: { id: idEmpresa },
                    data: {
                        resetContrasenaCode
                    }
                })

            } else {
                console.log("entre aca");

                const idTrabajador = trabajadorEncontrado.id
                await prisma.trabajador.update({
                    where: { id: idTrabajador },
                    data: {
                        resetContrasenaCode
                    }
                })
            }

            transport.sendMail(
                recuperarContrasenaNotification(email, resetContrasenaCode),
                (err: any, info: any) =>
                    err ? console.log(err) : console.log(info.response)
            );
            return res.status(200).json("Email de recuperación enviado")
        } catch (error: any) {
            return res.status(404).json(error.message);
        }
    }
}