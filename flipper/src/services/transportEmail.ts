import nodemailer from "nodemailer";

const user = process.env.USER;
const pass = process.env.USER_PASSWORD;

const URL_RECUPERAR_CONTRASENA = `http://localhost:3000/gestionDeContrasena/cambiarContrasena/`

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

export const recuperarContrasenaNotification = (
  email: string,
) => {
  return {
    from: user,
    to: email,
    subject: "Recuperar Contraseña",
    text: `
    Estimado Usuario,
    
    Para recuperar su contraseña haga click en el siguiente link: http://localhost:3000/gestionDeContrasena/cambiarContrasena/${email}

    Flipper Eventos.
    `,
  };
};
