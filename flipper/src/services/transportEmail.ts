import nodemailer from "nodemailer";

const user = process.env.USER;
const pass = process.env.USER_PASSWORD;

export const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass,
  },
});

export const cancelNotification = (
  email: string[] | undefined,
  evento_nombre: string | undefined
) => {
  return {
    from: user,
    to: email,
    subject: "Notificacion de cancelacion del Evento",
    text: `
    Estimado Trabajador,
    
    Queremos informarle que el Evento ${evento_nombre}, ha sido cancelado. Si usted habia sido aprobado para el puesto, ya no deberá asistir.

    Disculpe las molestias.

    Flipper Eventos.
    `,
  };
};
