"use client";

import Link from "next/link";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    ErrorMessage,
} from 'formik';
import validationSchema from "@/utils/validationSchema";

interface FormValues {
    email: "",
    password: ""
}



function LogIn() {

    const { login, hasLoginError } = useSesionUsuarioContext();

    const initialValues: FormValues = {
        email: "",
        password: ""
    };

    return (
        <div className="min-h-screen flex justify-center items-center mx-8">
            <div className="max-w-xl flex flex-col gap-10">
                <h1 className="font-bold text-3xl">
                    Inicia Sesión
                </h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, actions) => {
                        await login(values.email, values.password);
                        actions.setSubmitting(false);
                    }}
                    validationSchema={validationSchema}
                >
                    <Form className="grid gap-5">
                        <Field id="email" name="email" placeholder=" Dirección de correo electrónico" className="h-10 pl-4 input input-bordered input-primary" />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                        <Field id="password" name="password" placeholder=" Contraseña" className="h-10 pl-4 input input-bordered input-primary" />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                        <button type="submit" className="justify-self-end bg-indigo-600 text-slate-200 text-2xl font-semibold rounded-md px-6 py-2">Submit</button>
                    </Form>
                </Formik>
                {hasLoginError && (
                    <span className="text-red-500">Correo o Contraseña no válido</span>
                )}
                <div className="flex flex-col">
                    <span className="font-semibold">
                        ¿Has olvidado tu contraseña? &nbsp;&nbsp;
                        <Link href="" className="text-teal-300">
                            Recuperar contraseña
                        </Link>
                    </span>
                    <span className="font-semibold">
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
