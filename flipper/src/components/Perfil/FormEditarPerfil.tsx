import React, { useEffect, useState } from 'react'
import { useFormik, } from 'formik'
import * as yup from "yup";

import { useSesionUsuarioContext } from '@/hooks/useSesionUsuarioContext';
import Swal from 'sweetalert2';


interface propsModifyProfile {
  idProfile?: string;
}
interface ProfileEmpresa {
  email: string;
  nombre: string;
  isDeleted: boolean;
  nombreceo: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  eventos: [];
}
interface modifyProfile {
  nombreEmpresa?: string | undefined;
  nombreceo?: string | undefined;
  email?: string | undefined;
  ciudad?: string | undefined;
  direccion?: string | undefined;
  telefono?: string | undefined;
  idEmpresa?: string | undefined;
}
const validationSchema = yup.object({
  nombreEmpresa: yup.string(),
  nombreceo: yup.string(),
  email: yup.string().email(),
  ciudad: yup.string(),
  direccion: yup.string(),
  telefono: yup.string(),
});
const FormEditarPerfil = ({ idProfile }: propsModifyProfile) => {
  const [profile, setProfile] = useState<ProfileEmpresa>();
  const { id, token } = useSesionUsuarioContext();

  const empresaProfile = async () => {
    await fetch("/api/empresa", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        realmethod: "GET",
        idEmpresa: id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((e) => e.message);
  };

  useEffect(() => {
    if (id) empresaProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      nombreEmpresa: profile?.nombre,
      nombreceo: profile?.nombreceo,
      email: profile?.email,
      ciudad: profile?.ciudad,
      direccion: profile?.direccion,
      telefono: profile?.telefono,
    },
    onSubmit: (values: modifyProfile) => {
      submitHandler(values);
    },
    validationSchema,
  });
  const submitHandler = async (values: modifyProfile) => {
    let newValues = {
      idEmpresa: id,
      realmethod: 'PUT',
      name: values.nombreEmpresa,
      nombreceo: values.nombreceo,
      email: values.email,
      ciudad: values.ciudad,
      direccion: values.direccion,
      telefono: values.telefono
    }
    await fetch(`/api/empresa`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    })

  }
  return (
    <div className="w-full h-full max-sm:h-full md:ml-6 lg:ml-0 flex flex-col 2xl:h-full lg:h-full items-center">
      <div className="xl:-mr-[250px]">
        <h3 className="text-indigo-600 font-bold text-center p-3 mt-2 pt-4 text-2xl">
          Edita tu perfil
        </h3>

        <form onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-start">
          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Nombre
              </label>
              <input
                name="nombreEmpresa"
                placeholder="Nombre de la empresa"
                type="text"
                value={formik.values.nombreEmpresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
              />
            </div>
          </div>
          {formik.touched.nombreEmpresa && formik.errors.nombreEmpresa ? (
            <div className="text-red-600">{formik.errors.nombreEmpresa}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Nombre
              </label>
              <input
                name="nombreceo"
                placeholder="Nombre del CEO"
                type="text"
                value={formik.values.nombreceo}
                onChange={formik.handleChange}
                className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {formik.touched.nombreceo && formik.errors.nombreceo ? (
            <div className="text-red-600">{formik.errors.nombreceo}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Email
              </label>
              <input
                name="email"
                placeholder="Email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Ciudad
              </label>
              <input
                name="ciudad"
                placeholder="Ciudad"
                type="text"
                value={formik.values.ciudad}
                onChange={formik.handleChange}
                className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {formik.touched.ciudad && formik.errors.ciudad ? (
            <div className="text-red-600">{formik.errors.ciudad}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Direccion
              </label>
              <input
                name="direccion"
                placeholder="Direccion"
                type="text"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {formik.touched.direccion && formik.errors.direccion ? (
            <div className="text-red-600">{formik.errors.direccion}</div>
          ) : null}

          <div className="w-full">
            <div className="w-full mb-4">
              <label className="relative text-indigo-600 text-lg">
                Teléfono
              </label>
              <input
                name="telefono"
                placeholder="telefono"
                type="text"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {formik.touched.telefono && formik.errors.telefono ? (
            <div className="text-red-600">{formik.errors.telefono}</div>
          ) : null}
          <button
            type="submit"
            className={`bg-[#4B39EF] hover:bg-[#6050f3] cursor-pointer rounded-lg px-16 py-2 mb-6 mt-2 text-lg text-white font-bold transition duration-300`}
          > Modificar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormEditarPerfil