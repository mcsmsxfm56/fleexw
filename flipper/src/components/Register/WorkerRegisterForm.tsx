"use client";

import { Post_Worker_Register } from "@/services/PostRegister";
import { WorkerRegisterData } from "@/types/Types";
import React, { useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import LoadingSubmitForm from "../LoadingSubmitForm";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import workerRegisterSchema from "@/utils/workerRegisterSchema";

const WorkerRegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const initialValues: WorkerRegisterData = {
    phone: "",
    email: "",
    password: "",
    name: "",
    idType: "",
    idNumber: "",
    ciudad: "",
  };

  const submitHandler = async (values: WorkerRegisterData) => {
    setSubmitError("");
    setSubmitting(true);
    await Post_Worker_Register(values)
      .then((res) => {
        Swal.fire("¡Éxito!", "Tu cuenta se ha creado", "success");
        router.push("/");
      })
      .catch((e: any) => {
        console.log(e);
        setSubmitError(e.response.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="">
      <h3 className="text-white font-bold text-center my-4">
        Todos los campos son obligatorios
      </h3>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          await submitHandler(values);
          actions.setSubmitting(false);
        }}
        validationSchema={workerRegisterSchema}
      >
        <Form className="flex flex-col gap-y-4 w-full ">
          <InputField
            type="text"
            id="name"
            name="name"
            placeholder="Tu Nombre"
          />
          <InputField
            type="text"
            id="ciudad"
            name="ciudad"
            placeholder="Tu Ciudad"
          />
          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="Dirección de correo electrónico"
          />

          <InputField
            type="text"
            id="phone"
            name="phone"
            placeholder="Teléfono"
          />

          <SelectField
            id="idType"
            name="idType"
            defaultOp="Seleccione su tipo de identificación"
            opciones={["Cédula", "Tarjeta de identidad", "Pasaporte", "NIT"]}
          />

          <InputField
            type="text"
            id="idNumber"
            name="idNumber"
            placeholder="Número de Identificación"
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
              className="self-center bg-indigo-600 text-slate-200 text-2xl font-semibold rounded-md px-6 py-2 hover:bg-indigo-500 transition duration-100"
            >
              Crear cuenta de Trabajador
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default WorkerRegisterForm;
