"use client";

import { createEvent } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import LoadingSubmitForm from "./LoadingSubmitForm";
import { Post_Company_Register } from "@/services/PostRegister";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";

const harcodedData = {
  id_empresa: "c68810cb-eca2-4d7a-b9f7-aa03569d3dd6",
  nombre: "fiesta xD",
  fecha_inicio: "x",
  fecha_final: "x",
  lugar: "x",
  cupos: 0,
  perfil: "x",
  pago: 0,
  observaciones: "x",
};

const validationSchema = yup.object({
  nombre: yup.string().required(""),
  fecha_inicio: yup.string().required(""),
  fecha_final: yup.string().required(""),
  lugar: yup.string().required(""),
  cupos: yup.number().required().positive().integer(),
  perfil: yup.string().required(""),
  pago: yup.number().required().positive().integer(),
  observaciones: yup.string().required(""),
});

const CreateEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { id } = useSesionUsuarioContext();
  const formik = useFormik({
    initialValues: {
      id_empresa: id,
      nombre: "",
      fecha_inicio: "",
      fecha_final: "",
      lugar: "",
      cupos: 0,
      perfil: "",
      pago: 0,
      observaciones: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  useEffect(() => {
    (() => formik.validateForm())();
  }, []);

  const submitHandler = async (values: createEvent) => {
    setSubmitError("");
    setIsLoading(true);
    await fetch("/api/event/create-event", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(() => {
      alert("Evento creado");
      router.push("/home");
    });
    setIsLoading(false);
  };
  console.log(formik.values);
  console.log(id);
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
          name="fecha_inicio"
          text="Fecha inicio"
          type="datetime-local"
          value={formik.values.fecha_inicio}
          changeFunc={formik.handleChange}
        />
        {formik.errors.fecha_inicio ? (
          <div className="text-red-500">{formik.errors.fecha_inicio}</div>
        ) : null}

        <InputField
          name="fecha_final"
          text="Fecha final"
          type="datetime-local"
          value={formik.values.fecha_final}
          changeFunc={formik.handleChange}
        />
        {formik.errors.fecha_final ? (
          <div className="text-red-500">{formik.errors.fecha_final}</div>
        ) : null}

        <InputField
          name="lugar"
          text="Dirección"
          type="text"
          value={formik.values.lugar}
          changeFunc={formik.handleChange}
        />
        {formik.errors.lugar ? (
          <div className="text-red-500">{formik.errors.lugar}</div>
        ) : null}

        <InputField
          name="cupos"
          text="cupos"
          type="number"
          value={formik.values.cupos}
          changeFunc={formik.handleChange}
        />
        {formik.errors.cupos ? (
          <div className="text-red-500">{formik.errors.cupos}</div>
        ) : null}

        <InputField
          name="perfil"
          text="perfil"
          type="text"
          value={formik.values.perfil}
          changeFunc={formik.handleChange}
        />
        {formik.errors.perfil ? (
          <div className="text-red-500">{formik.errors.perfil}</div>
        ) : null}

        <InputField
          name="pago"
          text="pago"
          type="number"
          value={formik.values.pago}
          changeFunc={formik.handleChange}
        />

        {formik.errors.pago ? (
          <div className="text-red-500">{formik.errors.pago}</div>
        ) : null}

        <InputField
          name="observaciones"
          text="observaciones"
          type="text"
          value={formik.values.observaciones}
          changeFunc={formik.handleChange}
        />

        {formik.errors.observaciones ? (
          <div className="text-red-500">{formik.errors.observaciones}</div>
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
              Crear Evento
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default CreateEventForm;
