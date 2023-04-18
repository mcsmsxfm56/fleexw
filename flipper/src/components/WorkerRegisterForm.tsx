"use client";

import { WorkerRegisterData } from "@/types/Types";
import React, { useState } from "react";

const harcodedData = {
  
}

const WorkerRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<WorkerRegisterData>({
    // Datos harcodeados
    phone: "3425552525",
    email: "Francoaglieri@hotmail.com",
    password: "1234",
    name: "SebaMax",
    idType: "",
    idNumber: 0,
    // phone: "",
    // email: "",
    // password: "",
    // rol: "",
    // name: "",
    // idType: "",
    // idNumber: 0,
  });

  return <div></div>;
};

export default WorkerRegisterForm;
