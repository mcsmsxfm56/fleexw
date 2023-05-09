"use client";

import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';
import { useState } from "react";

import LoadingSubmitForm from "@/components/LoadingSubmitForm";
import validationCambiarContrasenaSchema from "@/utils/validationCambiarContrasenaSchema";
import { useRouter } from 'next/router';
import { cambiarContrasena } from '@/services/cambiarContrasena';

function RecuperarContrasena() {

    const router = useRouter()
    const resetContrasenaCode = router.query?.code as string

    const [loading, setLoading] = useState(false);

    const initialValues = {
        password: ""
    };

    return (
        <div className="min-h-screen flex justify-center items-center mx-8">
            <div className="max-w-xl flex flex-col gap-10">
                <h1 className="font-bold text-3xl">
                    Cambiar Contraseña
                </h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, actions) => {
                        setLoading(true)
                        console.log("values", values);

                        try {
                            await cambiarContrasena(resetContrasenaCode, values.password)
                            actions.setSubmitting(false)
                            alert("cambiaste la contraseña")
                        } catch (error: any) {
                            console.log(error.message)
                            alert("no se pudo cambiar la contraseña")
                        } finally {
                            setLoading(false)
                            router.push("/")
                        }
                    }}
                    validationSchema={validationCambiarContrasenaSchema}
                >
                    <Form className="grid gap-5">
                        <Field id="password" name="password" placeholder=" Nueva Contraseña" className="h-10 pl-4 input input-bordered input-primary" />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                        {
                            loading ?
                                <LoadingSubmitForm /> :
                                <button
                                    type="submit"
                                    className="justify-self-end bg-indigo-600 text-slate-200 text-2xl font-semibold rounded-md px-6 py-2 hover:bg-indigo-500 transition duration-100">
                                    Cambiar
                                </button>
                        }
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default RecuperarContrasena;
