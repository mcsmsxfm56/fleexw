import * as yup from "yup";

export default yup.object({
  nombre: yup.string().required("Nombre requerido"),
  nombreceo: yup.string().required("Nombre del CEO requerido"),
  ciudad: yup.string().required("Ciudad requerida"),
  direccion: yup.string().required("Dirección requerida"),
  email: yup.string().email("Debes colocar un correo válido").required("Dirección de correo requerida"),
  password: yup.string().required("Contraseña requerida"),
  telefono: yup
    .string()
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    .required("Teléfono requerido"),
});
