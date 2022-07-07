import { useId } from 'react';

const MyInput = (props) => {
  const id = useId();
  return (
    <div
      className={`flex basis-${props.basis} items-center rounded-[18px] px-4 pt-1 pb-1.5 text-[18px] bg-gray-700 text-white border border-transparent border-solid focus-within:border-blue-800 shadow-[0_0_3px_2px_transparent] focus-within:shadow-blue-500`}
    >
      <div className="flex flex-col w-full">
        <label className="text-[12px]  opacity-50" htmlFor={id}>
          {props.title}
        </label>
        <input
          required
          className="outline-none border-none bg-transparent w-full font-[500] opacity-100 text-white"
          id={id}
          type={props.type ?? 'text'}
        />
      </div>
      <div className="opacity-50">{props.icon}</div>
    </div>
  );
};

export default MyInput;
