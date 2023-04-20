"use client";

import { Post_Worker_Register } from "@/services/PostRegister";
import { WorkerRegisterData } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import LoadingSubmitForm from "./LoadingSubmitForm";
import { useRouter } from "next/router";
import { parseArgs } from "util";

const harcodedData = {
  // Datos harcodeados
  phone: "3425552524",
  email: "francoaglieri@hotmail.com",
  password: "1234",
  name: "Seba",
  idType: "",
  idNumber: "9999",
};

const resetErrors = {
  phone: "",
  email: "",
  password: "",
  name: "",
  idType: "",
  idNumber: "",
};

const WorkerRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState<WorkerRegisterData>(
    // harcodedData
    {
      phone: "",
      email: "",
      password: "",
      name: "",
      idType: "",
      idNumber: "",
    }
  );
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    password: "",
    name: "",
    idType: "",
    idNumber: "",
  });

  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);
  useEffect(() => {
    checkErrors();
  }, [errors]);

  // TODO checkErrors y valdiateForm cambiarán una vez implemente Formik y Yup
  const checkErrors = (): boolean => {
    let flag = true;
    for (const key in errors) {
      if (flag) {
        if (formData[key as keyof WorkerRegisterData] == "") flag = false;
        if (errors[key as keyof WorkerRegisterData] !== "") flag = false;
      }
    }
    setValidForm(flag);
    return flag;
  };

  function validateForm(values: WorkerRegisterData) {
    // TODO Terminar esta funcion con Yup y Formik
    setValidForm(true);
    let errors = resetErrors;
    checkErrors();
    return errors;
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsLoading(true);
    await Post_Worker_Register(formData)
      .then(() => {
        alert("Usuario creado");
        router.push("/");
      })
      // TODO arreglar error como Any
      .catch((e: any) => {
        console.log(e.response.data);
        setSubmitError(e.response.data);
      });
    setIsLoading(false);
  };

  const handleChangeState = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h3 className="text-white font-bold">
        Todos los campos son obligatorios
      </h3>

      <form
        onSubmit={submitHandler}
        className="w-full flex flex-col items-center"
      >
        <InputField
          name="name"
          text="Nombre"
          type="text"
          value={formData.name}
          changeFunc={handleChangeState}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
        <InputField
          name="email"
          text="E-Mail"
          type="text"
          value={formData.email}
          changeFunc={handleChangeState}
        />
        <InputField
          name="phone"
          text="Teléfono"
          type="text"
          value={formData.phone}
          changeFunc={handleChangeState}
        />
        <SelectField
          name="idType"
          defaultOp="Seleccione su tipo de identificación"
          opciones={["Cédula", "Tarjeta de identidad", "Pasaporte", "NIT"]}
          value={formData.idType}
          changeFunc={handleChangeState}
        />
        <InputField
          name="idNumber"
          text="Número de Identificación"
          type="number"
          value={formData.idNumber}
          changeFunc={handleChangeState}
        />
        <InputField
          name="password"
          text="Contraseña"
          type="password"
          value={formData.password}
          changeFunc={handleChangeState}
        />
        {submitError && (
          <span className="bg-red-600 text-white font-bold px-8 py-2 rounded mb-4">
            {submitError}
          </span>
        )}
        {isLoading ? (
          <LoadingSubmitForm />
        ) : (
          <button
            type="submit"
            className={`${
              validForm ? "bg-[#4B39EF]" : "bg-slate-400"
            } rounded-lg px-16 py-2 text-lg text-white font-bold`}
            disabled={!validForm}
          >
            Crear Cuenta de Empresa
          </button>
        )}
      </form>
    </>
  );
};

export default WorkerRegisterForm;
