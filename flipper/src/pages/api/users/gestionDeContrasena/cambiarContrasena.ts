import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT" && req.body.realmethod === "PUT") {
        const resetContrasenaCode: string = req.body.resetContrasenaCode;
        const password: string = req.body.password;
        if (!resetContrasenaCode || !password) {
            return res.status(400).json("Datos Faltantes")
        }
        try {
            const trabajadorEncontrado: any = await prisma.trabajador.findFirst({
                where: { resetContrasenaCode },
            });
            const empresaEncontrada: any = await prisma.empresa.findFirst({
                where: { resetContrasenaCode },
            });

            if (empresaEncontrada && trabajadorEncontrado) {
                return res.status(404).json("no se encontro el usuario");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if (empresaEncontrada) {
                const idEmpresa = empresaEncontrada.id
                await prisma.empresa.update({
                    where: { id: idEmpresa },
                    data: {
                        password: hashedPassword
                    }
                })

            } else {
                const idTrabajador = trabajadorEncontrado.id
                await prisma.trabajador.update({
                    where: { id: idTrabajador },
                    data: {
                        password: hashedPassword
                    }
                })
            }
            return res.status(200).json("Contraseña cambiada exitosamente");
        } catch (error: any) {
            return res.status(404).json(error.message);
        }
    }
}