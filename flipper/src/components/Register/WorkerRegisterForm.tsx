"use client";

import { Post_Worker_Register } from "@/services/PostRegister";
import { WorkerRegisterData } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import LoadingSubmitForm from "../LoadingSubmitForm";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";

const harcodedData = {
  // Datos harcodeados
  phone: "3425552524",
  email: "francoaglieri@hotmail.com",
  password: "1234",
  name: "Seba",
  idType: "",
  idNumber: "9999",
};

const validationSchema = yup.object({
  name: yup.string().required(""),
  email: yup.string().email("Debes colocar un mail válido").required(""),
  phone: yup
    .string()
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    // .min(10, "El teléfono debe tener al menos 10 dígitos")
    // .max(10, "El teléfono debe tener como máximo 10 dígitos")
    .required(""),
  password: yup.string().required(""),
  idNumber: yup
    .number()
    .typeError("La identificación debe ser un número")
    .required("")
    .integer("La identificación debe ser un número entero"),
  idType: yup.string().required(""),
});

const WorkerRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      phone: "",
      name: "",
      password: "",
      email: "",
      idType: "",
      idNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  useEffect(() => {
    (() => formik.validateForm())();
  }, []);

  const submitHandler = async (values: WorkerRegisterData) => {
    setSubmitError("");
    setIsLoading(true);
    await Post_Worker_Register(values)
      .then(() => {
        alert("Usuario creado");
        router.push("/");
      })
      // TODO arreglar error como Any
      .catch((e: any) => {
        setSubmitError(e.response.data);
      });
    setIsLoading(false);
  };

  return (
    <>
      <h3 className="text-white font-bold">
        Todos los campos son obligatorios
      </h3>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <InputField
          name="name"
          text="Nombre"
          type="text"
          value={formik.values.name}
          changeFunc={formik.handleChange}
        />
        {formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}

        <InputField
          name="email"
          text="E-Mail"
          type="email"
          value={formik.values.email}
          changeFunc={formik.handleChange}
        />
        {formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}

        <InputField
          name="phone"
          text="Teléfono"
          type="text"
          value={formik.values.phone}
          changeFunc={formik.handleChange}
        />
        {formik.errors.phone ? (
          <div className="text-red-500">{formik.errors.phone}</div>
        ) : null}

        <SelectField
          name="idType"
          defaultOp="Seleccione su tipo de identificación"
          opciones={["Cédula", "Tarjeta de identidad", "Pasaporte", "NIT"]}
          value={formik.values.idType}
          changeFunc={formik.handleChange}
        />
        {formik.errors.idType ? (
          <div className="text-red-500">{formik.errors.idType}</div>
        ) : null}

        <InputField
          name="idNumber"
          text="Número de Identificación"
          type="number"
          value={formik.values.idNumber}
          changeFunc={formik.handleChange}
        />
        {formik.errors.idNumber ? (
          <div className="text-red-500">{formik.errors.idNumber}</div>
        ) : null}

        <InputField
          name="password"
          text="Contraseña"
          type="password"
          value={formik.values.password}
          changeFunc={formik.handleChange}
        />
        {formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}

        {submitError && (
          <span className="bg-red-600 relative text-white font-bold px-8 py-2 rounded my-4 hover:bg-red-400 cursor-pointer">
            {submitError}
          </span>
        )}

        {isLoading ? (
          <LoadingSubmitForm />
        ) : (
          <>
            {!formik.isValid && (
              <p className="text-white mt-4">Debe rellenar todos los campos</p>
            )}
            <button
              type="submit"
              className={`${formik.touched && formik.isValid
                  ? "bg-[#4B39EF] hover:bg-[#6050f3] cursor-pointer transition duration-200"
                  : "bg-slate-400"
                } rounded-lg px-16 py-2 my-4 text-lg text-white font-bold`}
              disabled={!formik.isValid}
            >
              Crear Cuenta de Trabajador
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default WorkerRegisterForm;
