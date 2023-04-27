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
      <label className="relative text-indigo-600 text-lg">
        {text}
        <input
          type={type}
          name={name}
          value={value}
          onChange={changeFunc}
          className="w-full input input-bordered input-primary max-w-xs md:w-screen md:flex md:flex-col md:justify-center md:max-w-lg lg:w-screen lg:max-w-xl lg:flex lg:flex-col lg:justify-center"
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
