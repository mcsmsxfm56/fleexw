import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
}

const InputField = ({ id, name, placeholder, type }: InputFieldProps) => {
  return (
    <>
      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className=" w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center "
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </>
  );
};

export default InputField;
