"use client";

import { WorkerRegisterData } from "@/types/Types";
import React, { useState } from "react";

const harcodedData = {
  // Datos harcodeados
  phone: "3425552525",
  email: "Francoaglieri@hotmail.com",
  password: "1234",
  name: "SebaMax",
  idType: "",
  idNumber: 0,
};

const WorkerRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [formData, setFormData] = useState<WorkerRegisterData>(
    harcodedData
    //   {
    //   phone: "",
    //   email: "",
    //   password: "",
    //   name: "",
    //   idType: "",
    //   idNumber: 0,
    // }
  );
  const [errors, setErrors] = useState<WorkerRegisterData>({
    phone: "",
    email: "",
    password: "",
    name: "",
    idType: "",
    idNumber: 0,
  });

  return <div></div>;
};

export default WorkerRegisterForm;
