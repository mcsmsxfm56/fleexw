"use client";

import Link from "next/link";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "@/utils/validationSchema";
import { useState } from "react";
import LoadingSubmitForm from "@/components/LoadingSubmitForm";
import { FormValues } from "@/types/Types";

function LogIn() {
  const { login, hasLoginError } = useSesionUsuarioContext();
  const [loading, setLoading] = useState(false);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  return (
    <div className="min-h-screen flex justify-center items-center mx-8">
      <div className="max-w-xl flex flex-col gap-10">
        <h1 className="font-bold text-3xl">Inicia Sesión</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            setLoading(true);
            await login(values.email, values.password);
            actions.setSubmitting(false);
            setLoading(false);
          }}
          validationSchema={validationSchema}
        >
          <Form className="grid gap-5">
            <Field
              id="email"
              name="email"
              placeholder=" Dirección de correo electrónico"
              className="h-10 pl-4 input input-bordered input-primary"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
            <Field
              id="password"
              name="password"
              type="password"
              placeholder=" Contraseña"
              className="h-10 pl-4 input input-bordered input-primary"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
            {loading ? (
              <LoadingSubmitForm />
            ) : (
              <button
                type="submit"
                className="justify-self-end bg-indigo-600 text-slate-200 text-2xl font-semibold rounded-md px-6 py-2 hover:bg-indigo-500 transition duration-100"
              >
                Ingresar
              </button>
            )}
          </Form>
        </Formik>
        {hasLoginError?.status && (
          <span className="text-red-500">{hasLoginError.message}</span>
        )}
        <div className="flex flex-col">
          <span className="font-semibold flex flex-wrap justify-center">
            ¿Has olvidado tu contraseña? &nbsp;&nbsp;
            <Link
              href="/gestionDeContrasena/recuperarContrasena"
              className="text-teal-300"
            >
              Recuperar contraseña
            </Link>
          </span>
          <span className="font-semibold flex flex-wrap justify-center">
            ¿No tienes una cuenta? &nbsp;&nbsp;
            <Link href="/register" className="text-teal-300">
              Crear una cuenta
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
