"use client";

import { CompanyData } from "@/types/Types";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import LoadingSubmitForm from "./LoadingSubmitForm";
import { Post_Company_Register } from "@/services/PostRegister";
import validator from "validator";

const harcodedData = {
  nombre: "SebaMax",
  nombreceo: "Sebastian",
  ciudad: "BS AS",
  direccion: "Calle falsa 123",
  email: "Francoaglieri@hotmail.com",
  password: "1234",
  telefono: "3425552525",
};

const resetErrors = {
  nombre: "",
  nombreceo: "",
  ciudad: "",
  direccion: "",
  email: "",
  password: "",
  telefono: "",
};

const CompanyRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [formData, setFormData] = useState<CompanyData>(
    harcodedData
    //   {
    //   nombre: "",
    //   nombreceo: "",
    //   ciudad: "",
    //   direccion: "",
    //   email: "",
    //   password: "",
    //   telefono: "",
    // }
  );
  const [errors, setErrors] = useState<CompanyData>({
    nombre: "",
    nombreceo: "",
    ciudad: "",
    direccion: "",
    email: "",
    password: "",
    telefono: "",
  });

  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);
  useEffect(() => {
    checkErrors();
  }, [errors]);

  const checkErrors = (): boolean => {
    let flag = true;
    for (const key in errors) {
      if (errors[key as keyof CompanyData] !== "") {
        flag = false;
      }
    }
    setValidForm(flag);
    return flag;
  };

  function validateForm(values: CompanyData) {
    setValidForm(true);
    let errors: CompanyData = resetErrors
    const { ciudad, direccion, email, nombre, nombreceo, password, telefono } =
      values;

    if (!nombre) {
      errors.nombre = "El nombre es obligatorio";
    }
    console.log(errors);
    return errors;
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // const response = await Post_Company_Register(formData);
      console.log("exito");
    } catch {
      //
      console.log("failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeState = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-col items-center"
    >
      <InputField
        name="nombre"
        text="Nombre"
        type="text"
        value={formData.nombre}
        changeFunc={handleChangeState}
      />
      {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
      <InputField
        name="nombreceo"
        text="Nombre Ceo"
        type="text"
        value={formData.nombreceo}
        changeFunc={handleChangeState}
      />
      <InputField
        name="ciudad"
        text="Ciudad"
        type="text"
        value={formData.ciudad}
        changeFunc={handleChangeState}
      />
      <InputField
        name="direccion"
        text="Dirección"
        type="text"
        value={formData.direccion}
        changeFunc={handleChangeState}
      />
      <InputField
        name="email"
        text="E-mail"
        type="email"
        value={formData.email}
        changeFunc={handleChangeState}
      />
      <InputField
        name="telefono"
        text="Telefono"
        type="text"
        value={formData.telefono}
        changeFunc={handleChangeState}
      />
      <InputField
        name="password"
        text="Contraseña"
        type="password"
        value={formData.password}
        changeFunc={handleChangeState}
      />
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
  );
};

export default CompanyRegisterForm;
