import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { recuperarContrasenaNotification, transport } from "@/services/transportEmail";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT" && req.body.realmethod === "GET") {
        const email: string = req.body.email;
        if (!email) {
            return res.status(400).send("Email requerido")
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
            transport.sendMail(
                recuperarContrasenaNotification(email),
                (err: any, info: any) =>
                    err ? console.log(err) : console.log(info.response)
            );
            return res.status(200).send("Email de recuperacion enviado")
        } catch (error: any) {
            return res.status(404).send(error.message);
        }
    }
}