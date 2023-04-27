import React, { useState } from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
} from "formik";
import { CompanyData } from "@/types/Types";
import companyRegisterSchema from "@/utils/companyRegisterSchema";
import { useRouter } from "next/router";
import { Post_Company_Register } from "@/services/PostRegister";
import LoadingSubmitForm from "../LoadingSubmitForm";
import Swal from "sweetalert2";
import InputField2 from "../InputField2";

const harcodedData = {
  nombre: "SebaMax",
  nombreceo: "Sebastian",
  ciudad: "BS AS",
  direccion: "Calle falsa 123",
  email: "Francoaglieri@hotmail.com",
  password: "1234",
  telefono: "3425552525",
};

const CompanyRegisterForm2 = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const initialValues: CompanyData = {
    ciudad: "",
    direccion: "",
    nombre: "",
    nombreceo: "",
    telefono: "",
    email: "",
    password: "",
  };

  const submitHandler = async (values: CompanyData) => {
    setSubmitError("");
    setSubmitting(true);
    await Post_Company_Register(values)
      .then(() => {
        Swal.fire("¡Éxito!", "Tu cuenta se ha creado", "success");
        router.push("/");
      })
      // TODO arreglar error como Any
      .catch((e: any) => {
        setSubmitError(e.response.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="w-full">
      <h3 className="text-white font-bold text-center my-4">
        Todos los campos son obligatorios
      </h3>
      <Formik
        initialValues={harcodedData}
        onSubmit={async (values, actions) => {
          await submitHandler(values);
          actions.setSubmitting(false);
        }}
        validationSchema={companyRegisterSchema}
      >
        <Form className="flex flex-col gap-y-4 w-full ">
          <InputField2
            id="nombre"
            name="nombre"
            placeholder="Nombre de la empresa"
          />
          {/* <Field
            id="nombre"
            name="nombre"
            placeholder="Nombre de la empresa"
            className="h-10 pl-4 border-2 border-zinc-200 rounded-lg"
          />
          <ErrorMessage
            name="nombre"
            component="div"
            className="text-red-500"
          /> */}

          <Field
            id="nombreceo"
            name="nombreceo"
            placeholder="Nombre del CEO"
            className="h-10 pl-4 border-2 border-zinc-200 rounded-full"
          />
          <ErrorMessage
            name="nombreceo"
            component="div"
            className="text-red-500"
          />

          <Field
            id="ciudad"
            name="ciudad"
            placeholder="Ciudad"
            className="h-10 pl-4 border-2 border-zinc-200 rounded-full"
          />
          <ErrorMessage
            name="ciudad"
            component="div"
            className="text-red-500"
          />

          <Field
            id="direccion"
            name="direccion"
            placeholder="Dirección"
            className="h-10 pl-4 border-2 border-zinc-200 rounded-full"
          />
          <ErrorMessage
            name="direccion"
            component="div"
            className="text-red-500"
          />

          <Field
            id="email"
            name="email"
            placeholder="Dirección de correo electrónico"
            className="h-10 pl-4 border-2 border-zinc-200 rounded-full"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <Field
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            className="h-10 pl-4 border-2 border-zinc-200 rounded-full"
          />
          <ErrorMessage
            name="telefono"
            component="div"
            className="text-red-500"
          />

          <Field
            id="password"
            name="password"
            placeholder="Contraseña"
            className="h-10 pl-4 border-2 border-zinc-200 rounded-full"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />

          {submitError && (
            <span className="bg-red-600 text-white font-bold px-8 py-2 rounded mb-4">
              {submitError}
            </span>
          )}

          {submitting ? (
            <LoadingSubmitForm />
          ) : (
            <button
              type="submit"
              className="self-center bg-indigo-600 text-slate-200 text-2xl font-semibold rounded-md px-6 py-2"
            >
              Crear cuenta de Empresa
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CompanyRegisterForm2;
