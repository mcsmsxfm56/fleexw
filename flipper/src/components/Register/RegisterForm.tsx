"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import WorkerRegisterForm from "./WorkerRegisterForm";
import CompanyRegisterForm from "./CompanyRegisterForm";

type CurrentRol = "" | "empresa" | "trabajador";

// Este array es solamente para generar las opciones de forma legible y no repetir campos como el classname
const RolTypes = [
  {
    value: "",
    text: "Seleccione su rol:",
  },
  {
    value: "empresa",
    text: "Soy una Empresa",
  },
  {
    value: "trabajador",
    text: "Soy un Trabajador",
  },
];

const RegisterForm: React.FC = () => {
  const [currentRol, setCurrentRol] = useState<CurrentRol>("");
  const router = useRouter();

  const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value as CurrentRol;
    setCurrentRol(val);
  };

  return (
    <div className="rounded-lg flex flex-col items-center m-auto relative max-w-xs md:w-screen md:max-w-lg lg:w-screen lg:max-w-xl">
      <h1 className="text-[#95A1AC] mb-4 font-bold text-3xl self-baseline">
        Bienvenido!
      </h1>

      <button
        className="w-[40px] h-[40px] text-[#646C70] rounded-3xl absolute right-0 font-bold hover:bg-slate-400 transition duration-200"
        onClick={() => router.push("/")}
      >
        X
      </button>

      <select
        value={currentRol}
        onChange={handleChangeState}
        className="w-full mb-4 py-2 pl-4 rounded-lg font-bold cursor-pointer bg-indigo-600 text-white"
      >
        {RolTypes.map((rol, index) => (
          <option key={`Rol_${index}`} value={rol.value} className="font-bold">
            {rol.text}
          </option>
        ))}
      </select>
      {currentRol == "" && (
        <span className="text-[#95A1AC] text-3xl self-baseline text-center w-full">Debe seleccionar un rol</span>
      )}
      {currentRol == "empresa" && <CompanyRegisterForm />}
      {currentRol == "trabajador" && <WorkerRegisterForm />}
    </div>
  );
};

export default RegisterForm;
