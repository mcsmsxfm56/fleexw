"use client";

import { createEvent } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import LoadingSubmitForm from "../LoadingSubmitForm";
import { Post_Company_Register } from "@/services/PostRegister";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
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

interface PropsCreateEventForm {
  idEvent?: string
}

const CreateEventForm = ({ idEvent }: PropsCreateEventForm) => {
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
    router.asPath !== "/home" ?
      await fetch(`http://localhost:3000/api/event/create-event/${idEvent}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("No se pudo realizar la petición");
          }
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            background: "#B1FFBD",
            color: "green",
            iconColor: "green",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Evento actualizado exitosamente",
          });
          router.push("/home");
        })
        .catch((e) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            background: "red",
            color: "white",
            iconColor: "white",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: "No se pudo actualizar el evento",
          });
        }) :

      await fetch("/api/event/create-event", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("No se pudo realizar la peticion");
          }
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            background: "#B1FFBD",
            color: "green",
            iconColor: "green",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Evento creado exitosamente",
          });
          router.push("/home");
        })
        .catch((e) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            background: "red",
            color: "white",
            iconColor: "white",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: "No se pudo crear el evento",
          });
        });
    setIsLoading(false);
  };
  /* console.log(formik.values);
  console.log(id); */
  return (
    <div className="w-full h-full max-sm:h-full md:ml-6 lg:ml-0 flex flex-col 2xl:h-full lg:h-full items-center">
      <div className="xl:-mr-[250px]">
        <h3 className="text-indigo-600 font-bold text-center p-3 mt-2 pt-20 text-2xl">
          {
            router.asPath !== "/home" ?
              "Editar Evento" :
              "Crea tu Evento"
          }

        </h3>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-start">
          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Nombre
                <input
                  name="nombre"
                  placeholder="Nombre"
                  type="text"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
          </div>
          {formik.errors.nombre ? (
            <div className="text-red-600">{formik.errors.nombre}</div>
          ) : null}
          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Fecha Inicio
                <input
                  name="fecha_inicio"
                  placeholder="Fecha inicio"
                  type="datetime-local"
                  value={formik.values.fecha_inicio}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
          </div>
          {formik.errors.fecha_inicio ? (
            <div className="text-red-600">{formik.errors.fecha_inicio}</div>
          ) : null}
          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Fecha Inicial
                <input
                  name="fecha_final"
                  placeholder="Fecha final"
                  type="datetime-local"
                  value={formik.values.fecha_final}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
          </div>
          {formik.errors.fecha_final ? (
            <div className="text-red-600">{formik.errors.fecha_final}</div>
          ) : null}
          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Dirección
                <input
                  name="lugar"
                  placeholder="Dirección"
                  type="text"
                  value={formik.values.lugar}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
          </div>
          {formik.errors.lugar ? (
            <div className="text-red-600">{formik.errors.lugar}</div>
          ) : null}
          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Cupos
                <input
                  name="cupos"
                  placeholder="Cupos"
                  type="number"
                  value={formik.values.cupos}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
          </div>
          {formik.errors.cupos ? (
            <div className="text-red-600 mb-2">{formik.errors.cupos}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Perfil
                <input
                  name="perfil"
                  placeholder="Perfil"
                  type="text"
                  value={formik.values.perfil}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
          </div>
          {formik.errors.perfil ? (
            <div className="text-red-600">{formik.errors.perfil}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Pago
                <input
                  name="pago"
                  placeholder="Pago"
                  type="number"
                  value={formik.values.pago}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
          </div>
          {formik.errors.pago ? (
            <div className="text-red-600 mb-2">{formik.errors.pago}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Observaciones
                <input
                  name="observaciones"
                  placeholder="Observaciones"
                  type="text"
                  value={formik.values.observaciones}
                  onChange={formik.handleChange}
                  className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                />
              </label>
            </div>
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
                  className={`${formik.touched && formik.isValid
                    ? "bg-[#4B39EF] hover:bg-[#6050f3] cursor-pointer"
                    : "bg-slate-400"
                    } rounded-lg px-16 py-2 mb-6 mt-2 text-lg text-white font-bold transition duration-300`}
                  disabled={!formik.isValid}>
                  {
                    router.asPath !== "/home" ?
                      "Actualizar Evento" :
                      "Crear Evento"
                  }

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
