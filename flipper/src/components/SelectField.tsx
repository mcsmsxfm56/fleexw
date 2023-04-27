import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputSelectProps {
  id: string;
  name: string;
  defaultOp: string;
  opciones: string[];
}

const SelectField = ({ name, opciones, id, defaultOp }: InputSelectProps) => {
  return (
    <>
      <Field
        as="select"
        name={name}
        id={id}
        className="h-10 pl-4 border-2 border-zinc-200 rounded-lg cursor-pointer"
      >
        <option key={`Select_0`} value="">
          {defaultOp}
        </option>
        {opciones.map((op, index) => (
          <option key={`Select_${op}_${index}`} value={op}>
            {op}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </>
  );
};

export default SelectField;
