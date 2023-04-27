import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputFieldProps {
  id: string;
  name: string;
  placeholder: string;
}

const InputField2 = ({ id, name, placeholder }: InputFieldProps) => {
  return (
    <>
      <Field
        id={id}
        name={name}
        placeholder={placeholder}
        className="h-10 pl-4 border-2 border-zinc-200 rounded-lg"
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </>
  );
};

export default InputField2;
