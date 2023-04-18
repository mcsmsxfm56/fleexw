"use client";

import React, { useState } from "react";
import WorkerRegisterForm from "./WorkerRegisterForm";
import CompanyRegisterForm from "./CompanyRegisterForm";

type CurrentRol = "" | "empresa" | "trabajador";

const RegisterForm: React.FC = () => {
  const [currentRol, setCurrentRol] = useState<CurrentRol>("");

  const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value as CurrentRol;
    setCurrentRol(val);
  };

  return (
    <div className="rounded-lg">
      <h1 className="text-[#95A1AC] mb-4 text-4xl">Bienvenido!</h1>
      <select
        value={currentRol}
        onChange={handleChangeState}
        className="w-full mb-4"
      >
        <option key={`Rol_0`} value="">
          Seleccione su Rol:
        </option>
        <option key={`Rol_1`} value={"empresa"}>
          Soy una empresa
        </option>
        <option key={`Rol_2`} value={"trabajador"}>
          Soy un trabajador
        </option>
      </select>
      {currentRol == "" && (
        <span className="text-white">Debe seleccionar un rol</span>
      )}
      {currentRol == "empresa" && <CompanyRegisterForm />}
      {currentRol == "trabajador" && (
        <span className="text-white">Trabajador</span>
      )}
    </div>
  );
};

export default RegisterForm;