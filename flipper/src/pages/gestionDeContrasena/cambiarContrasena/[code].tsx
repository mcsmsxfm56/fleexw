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
import Swal from 'sweetalert2';

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
                        try {
                            await cambiarContrasena(resetContrasenaCode, values.password)
                            actions.setSubmitting(false)
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
                                title: "Cambiaste tu contraseña, ya puedes volver a ingresar!",
                            });
                        } catch (error: any) {
                            Swal.fire({
                                icon: "error",
                                title: "Lo sentimos, no pudimos cambiar tu contraseña.",
                            });
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
