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
    <label className="w-full">
      <select
        name={name}
        value={value}
        onChange={changeFunc}
        className="w-full mb-4 py-2 pl-4 rounded-lg text-[#434648] font-bold cursor-pointer"
      >
        <option value="">{defaultOp}:</option>
        {opciones.map((op, index) => (
          <option key={`${name}_${index}`} value={op} className="font-bold">
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectField;
