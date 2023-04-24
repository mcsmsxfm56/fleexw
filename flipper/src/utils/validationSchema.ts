import * as yup from "yup";



export default yup.object().shape({
  password: yup.string().required("Password requerido"),
  email: yup.string().required("Email requerido").email("Formato inválido"),
});