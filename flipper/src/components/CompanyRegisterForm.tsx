"use client";

import { CompanyData } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import LoadingSubmitForm from "./LoadingSubmitForm";
import { Post_Company_Register } from "@/services/PostRegister";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";

const harcodedData = {
  nombre: "SebaMax",
  nombreceo: "Sebastian",
  ciudad: "BS AS",
  direccion: "Calle falsa 123",
  email: "Francoaglieri@hotmail.com",
  password: "1234",
  telefono: "3425552525",
};

const validationSchema = yup.object({
  nombre: yup.string().required(""),
  nombreceo: yup.string().required(""),
  ciudad: yup.string().required(""),
  direccion: yup.string().required(""),
  email: yup.string().email("Debes colocar un mail válido").required(""),
  password: yup.string().required(""),
  telefono: yup
    .string()
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    // .min(10, "El teléfono debe tener al menos 10 dígitos")
    // .max(10, "El teléfono debe tener como máximo 10 dígitos")
    .required(""),
});

const CompanyRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      nombreceo: "",
      ciudad: "",
      direccion: "",
      email: "",
      password: "",
      telefono: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  useEffect(() => {
    (() => formik.validateForm())();
  }, []);

  const submitHandler = async (values: CompanyData) => {
    setSubmitError("");
    setIsLoading(true);
    await Post_Company_Register(values)
      .then(() => {
        alert("Empresa creada");
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
          name="nombre"
          text="Nombre"
          type="text"
          value={formik.values.nombre}
          changeFunc={formik.handleChange}
        />
        {formik.errors.nombre ? (
          <div className="text-red-500">{formik.errors.nombre}</div>
        ) : null}

        <InputField
          name="nombreceo"
          text="Nombre Ceo"
          type="text"
          value={formik.values.nombreceo}
          changeFunc={formik.handleChange}
        />
        {formik.errors.nombreceo ? (
          <div className="text-red-500">{formik.errors.nombreceo}</div>
        ) : null}

        <InputField
          name="ciudad"
          text="Ciudad"
          type="text"
          value={formik.values.ciudad}
          changeFunc={formik.handleChange}
        />
        {formik.errors.ciudad ? (
          <div className="text-red-500">{formik.errors.ciudad}</div>
        ) : null}

        <InputField
          name="direccion"
          text="Dirección"
          type="text"
          value={formik.values.direccion}
          changeFunc={formik.handleChange}
        />
        {formik.errors.direccion ? (
          <div className="text-red-500">{formik.errors.direccion}</div>
        ) : null}

        <InputField
          name="email"
          text="E-mail"
          type="email"
          value={formik.values.email}
          changeFunc={formik.handleChange}
        />
        {formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}

        <InputField
          name="telefono"
          text="Telefono"
          type="text"
          value={formik.values.telefono}
          changeFunc={formik.handleChange}
        />
        {formik.errors.telefono ? (
          <div className="text-red-500">{formik.errors.telefono}</div>
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
          <span className="bg-red-600 text-white font-bold px-8 py-2 rounded mb-4">
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
              className={`${
                formik.touched && formik.isValid
                  ? "bg-[#4B39EF] hover:bg-[#6050f3] cursor-pointer"
                  : "bg-slate-400"
              } rounded-lg px-16 py-2 my-4 text-lg text-white font-bold transition duration-300`}
              disabled={!formik.isValid}
            >
              Crear Cuenta de Empresa
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default CompanyRegisterForm;
