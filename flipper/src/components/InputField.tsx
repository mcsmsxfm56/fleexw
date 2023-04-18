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
      <label className="relative text-white text-lg">
        {text}
        <input
          type={type}
          name={name}
          value={value}
          onChange={changeFunc}
          className="w-full px-4 py-2 bg-[#101213] text-sm border-2 rounded-lg border-white text-white  transition duration-300 focus:border-none focus:border-0"
          placeholder=" "
        />
        {/* <span className="text-2xl text-white text-opacity-80 absolute left-0 mt-2 mx-4 transition duration-300 input-text">
          {text}
        </span> */}
      </label>
    </div>
  );
};

export default InputField;