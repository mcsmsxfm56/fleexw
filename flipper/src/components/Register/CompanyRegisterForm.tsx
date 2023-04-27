import React, { useState } from "react";
import { Formik, Form } from "formik";
import { CompanyData } from "@/types/Types";
import companyRegisterSchema from "@/utils/companyRegisterSchema";
import { useRouter } from "next/router";
import { Post_Company_Register } from "@/services/PostRegister";
import LoadingSubmitForm from "../LoadingSubmitForm";
import Swal from "sweetalert2";
import InputField from "../InputField";

const CompanyRegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const initialValues: CompanyData = {
    nombre: "",
    nombreceo: "",
    ciudad: "",
    direccion: "",
    email: "",
    password: "",
    telefono: "",
  };

  const submitHandler = async (values: CompanyData) => {
    setSubmitError("");
    setSubmitting(true);
    await Post_Company_Register(values)
      .then(() => {
        Swal.fire("¡Éxito!", "Tu cuenta se ha creado", "success");
        router.push("/");
      })
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
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          await submitHandler(values);
          actions.setSubmitting(false);
        }}
        validationSchema={companyRegisterSchema}
      >
        <Form className="flex flex-col gap-y-4 w-full ">
          <InputField
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre de la empresa"
          />

          <InputField
            type="text"
            id="nombreceo"
            name="nombreceo"
            placeholder="Nombre del CEO"
          />

          <InputField
            type="text"
            id="ciudad"
            name="ciudad"
            placeholder="Ciudad de su emrpesa"
          />

          <InputField
            type="text"
            id="direccion"
            name="direccion"
            placeholder="Dirección de su empresa"
          />

          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="Dirección de correo electrónico"
          />

          <InputField
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
          />

          <InputField
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
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

export default CompanyRegisterForm;
