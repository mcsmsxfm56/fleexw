"use client";

import { createEvent } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import LoadingSubmitForm from "../LoadingSubmitForm";
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
  cupos: yup
    .number()
    .required("El cupo debe ser mayor a 0")
    .positive("El cupo debe ser mayor a 0")
    .integer(),
  perfil: yup.string().required(""),
  pago: yup
    .number()
    .required("El Pago debe ser mayor a 0")
    .positive("El Pago debe ser mayor a 0")
    .integer(),
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
  /* console.log(formik.values);
  console.log(id); */
  return (
    <div className="w-full h-screen max-sm:h-full md:ml-6 lg:ml-0 flex flex-col lg:h-full items-center">
      <div className="xl:-mr-[250px]">
        <h3 className="text-indigo-600 font-bold text-center p-3 mt-2 text-2xl">
          Crea tu Evento
        </h3>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-start">
          <div className="w-full">
            <InputField
              name="nombre"
              text="Nombre"
              type="text"
              value={formik.values.nombre}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.nombre ? (
            <div className="text-red-600">{formik.errors.nombre}</div>
          ) : null}
          <div className="w-full">
            <InputField
              name="fecha_inicio"
              text="Fecha inicio"
              type="datetime-local"
              value={formik.values.fecha_inicio}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.fecha_inicio ? (
            <div className="text-red-600">{formik.errors.fecha_inicio}</div>
          ) : null}
          <div className="w-full">
            <InputField
              name="fecha_final"
              text="Fecha final"
              type="datetime-local"
              value={formik.values.fecha_final}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.fecha_final ? (
            <div className="text-red-600">{formik.errors.fecha_final}</div>
          ) : null}
          <div className="w-full">
            <InputField
              name="lugar"
              text="Dirección"
              type="text"
              value={formik.values.lugar}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.lugar ? (
            <div className="text-red-600">{formik.errors.lugar}</div>
          ) : null}
          <div className="w-full">
            <InputField
              name="cupos"
              text="Cupos"
              type="number"
              value={formik.values.cupos}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.cupos ? (
            <div className="text-red-600 mb-2">{formik.errors.cupos}</div>
          ) : null}
          <div className="w-full">
            <InputField
              name="perfil"
              text="Perfil"
              type="text"
              value={formik.values.perfil}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.perfil ? (
            <div className="text-red-600">{formik.errors.perfil}</div>
          ) : null}
          <div className="w-full">
            <InputField
              name="pago"
              text="Pago"
              type="number"
              value={formik.values.pago}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.pago ? (
            <div className="text-red-600 mb-2">{formik.errors.pago}</div>
          ) : null}
          <div className="w-full">
            <InputField
              name="observaciones"
              text="Observaciones"
              type="text"
              value={formik.values.observaciones}
              changeFunc={formik.handleChange}
            />
          </div>
          {formik.errors.observaciones ? (
            <div className="text-red-600">{formik.errors.observaciones}</div>
          ) : null}

          {submitError && (
            <span className="bg-red-600 text-white font-bold px-8 py-2 rounded mb-4">
              {submitError}
            </span>
          )}
          <div className="w-full text-center">
            {isLoading ? (
              <LoadingSubmitForm />
            ) : (
              <>
                {!formik.isValid && (
                  <p className="text-red-600">Debe rellenar todos los campos</p>
                )}
                <button
                  type="submit"
                  className={`${
                    formik.touched && formik.isValid
                      ? "bg-[#4B39EF] hover:bg-[#6050f3] cursor-pointer"
                      : "bg-slate-400"
                  } rounded-lg px-16 py-2 mb-6 mt-2 text-lg text-white font-bold transition duration-300`}
                  disabled={!formik.isValid}>
                  Crear Evento
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
