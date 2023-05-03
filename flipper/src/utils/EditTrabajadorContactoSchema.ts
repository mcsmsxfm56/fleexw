import * as yup from "yup";

export default yup.object({
  email: yup
    .string()
    .email("Debes colocar un mail válido")
    .required("Este campo es obligatorio"),
  phone: yup
    .string()
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    // .min(10, "El teléfono debe tener al menos 10 dígitos")
    // .max(10, "El teléfono debe tener como máximo 10 dígitos")
    .required("Debes colocar un numero de telefono"),
  direccion: yup.string().required("Debes colocar una direccion valida"),
  ciudad: yup.string().required("Debes colocar la ciudad donde vives"),
});
