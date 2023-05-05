"use client";

import Link from "next/link";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';
import { useState } from "react";
import LoadingSubmitForm from "@/components/LoadingSubmitForm";
import { recuperarContrasena } from "@/services/recuperarContrasena";
import validationRecupContrasenaSchema from "@/utils/validationRecupContrasenaSchema";
import { useRouter } from "next/router";

interface FormRecupContrasena {
    email: "",
}


function RecuperarContrasena() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [hasEmailError, setHasEmailError] = useState(false)

    const initialValues: FormRecupContrasena = {
        email: ""
    };

    return (
        <div className="min-h-screen flex justify-center items-center mx-8">
            <div className="max-w-xl flex flex-col gap-10">
                <h1 className="font-bold text-3xl">
                    Recuperar Contraseña
                </h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, actions) => {
                        setLoading(true)
                        try {
                            await recuperarContrasena(values.email) //aca va a estar la funcion de recuperar
                            actions.setSubmitting(false)
                            router.push("/")
                        } catch (error: any) {
                            console.log(error.message)
                            setHasEmailError(true)
                        } finally {
                            setLoading(false)
                        }
                    }}
                    validationSchema={validationRecupContrasenaSchema}
                >
                    <Form className="grid gap-5">
                        <Field id="email" name="email" placeholder=" Dirección de correo electrónico" className="h-10 pl-4 input input-bordered input-primary" />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                        {
                            loading ?
                                <LoadingSubmitForm /> :
                                <button type="submit" className="justify-self-end bg-indigo-600 text-slate-200 text-2xl font-semibold rounded-md px-6 py-2 hover:bg-indigo-500 transition duration-100">
                                    Recuperar
                                </button>
                        }
                    </Form>
                </Formik>
                {hasEmailError && (
                    <span className="text-red-500">Correo Inexistente</span>
                )}
                <div className="flex flex-col">
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

export default RecuperarContrasena;
