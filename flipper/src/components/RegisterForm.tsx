"use client";

import React, { useState } from "react";
import POST_Register from "../services/PostRegister";

export interface userData {
  phone: string;
  email: string;
  password: string;
  rol: string;
  name: string;
  idType: string;
  idNumber: number;
}

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<userData>({
    phone: "",
    email: "",
    password: "",
    rol: "",
    name: "",
    idType: "",
    idNumber: 0,
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await POST_Register(formData);
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
    console.log("enviar...");
  };

  const handleChangeState = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="rounded-lg">
      <h1 className="text-[#95A1AC] mb-4 text-4xl">Bienvenido!</h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center justify-center"
      >
        <InputField
          text={"Nombre completo"}
          type={"text"}
          name={"name"}
          value={formData.name}
          changeFunc={handleChangeState}
        />
        <InputField
          text={"Email"}
          type={"email"}
          name={"email"}
          value={formData.email}
          changeFunc={handleChangeState}
        />
        <InputField
          text={"Número de teléfono"}
          type={"text"}
          name={"phone"}
          value={formData.phone}
          changeFunc={handleChangeState}
        />
        <SelectField
          name="idType"
          value={formData.idType}
          changeFunc={handleChangeState}
          opciones={["Cédula", "Tarjeta de Identidad", "Pasaporte", `NIT`]}
          defaultOp="Seleccione un tipo de identifiación"
        />
        <InputField
          text={"Identificación"}
          type={"number"}
          name={"idNumber"}
          value={formData.idNumber}
          changeFunc={handleChangeState}
        />
        <InputField
          text={"Nombre completo"}
          type={"password"}
          name={"password"}
          value={formData.password}
          changeFunc={handleChangeState}
        />
        <SelectField
          name="rol"
          value={formData.rol}
          changeFunc={handleChangeState}
          opciones={["Soy una Empresa", "Soy una Persona"]}
          defaultOp="Seleccione su rol"
        />
        {isLoading ? (
          <span>Waiting for response...</span>
        ) : (
          <button
            type="submit"
            className="bg-[#4B39EF] rounded-lg px-10 py-2 text-lg text-white"
          >
            Crear Cuenta
          </button>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;

// v-----------------------------v InputField v-----------------------------v

interface InputFieldData {
  text: string;
  type: string;
  name: string;
  value: string | number;
  changeFunc: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
}

const InputField = ({
  text,
  type,
  name,
  value,
  changeFunc,
}: InputFieldData) => {
  return (
    <div className="w-full mb-4">
      <label className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={changeFunc}
          className="w-full px-4 py-2 bg-[#101213] text-3xl border-2 rounded-lg border-white text-white  transition duration-300 focus:border-none focus:border-0"
          placeholder=" "
        />
        <span className="text-2xl text-white text-opacity-80 absolute left-0 mt-2 mx-4 transition duration-300 input-text">
          {text}
        </span>
      </label>
    </div>
  );
};

// v-----------------------------v SelectField v-----------------------------v

interface SelectFieldData {
  opciones: string[];
  defaultOp: string;
  name: string;
  value: string | number;
  changeFunc: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
}

const SelectField = ({
  defaultOp,
  opciones,
  name,
  value,
  changeFunc,
}: SelectFieldData) => {
  return (
    <label className="w-full mb-4">
      <select
        name={name}
        value={value}
        onChange={changeFunc}
        className="w-full"
      >
        <option value="">{defaultOp}:</option>
        {opciones.map((op) => (
          <option key={"id_${op}"} value={op}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
};
