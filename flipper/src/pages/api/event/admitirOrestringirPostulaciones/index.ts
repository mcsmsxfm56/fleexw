import type { NextApiRequest, NextApiResponse } from "next";
import { cancelNotification, transport } from "@/services/transportEmail";
import prisma from "../../../../../lib/prisma";
import { fail } from "assert";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT" && req.body.realmethod === "PUT") {
        const id: string = req.body.eventoId as string;
        const admitePostulaciones: boolean = req.body.admitePostulaciones
        try {
            const evento = await prisma.evento.update({
                where: {
                    id,
                },
                data: {
                    admitePostulaciones
                }
            });
            if (evento) {
                if (evento.admitePostulaciones) {
                    return res.status(200).send({ message: "el evento admite postulaciones nuevamente" });
                }
                return res.status(200).send({ message: "el evento ya no admite postulaciones" });
            }
        } catch (error) {
            return res.status(404).send({ message: "la operacion no pudo realizarse" });
        }
    }
}