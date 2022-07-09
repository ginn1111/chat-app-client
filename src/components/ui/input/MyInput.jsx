import { useId } from 'react';
import { motion } from 'framer-motion';

export const InputInformation = ({ icon, type, title, width, placeholder }) => {
  const id = useId();
  return (
    <div
      className={`w-${
        width ?? 'full'
      } rounded-md bg-transparent px-2 py-1 border border-slate-300`}
    >
      <div className="flex flex-col w-full">
        <label className="text-[12px]  opacity-50" htmlFor={id}>
          {title}
        </label>
        <input
          required
          placeholder={placeholder}
          className="text-[16px] text-slate-600 outline-none border-none bg-transparent w-full font-[500] placeholder:font-normal placeholder:text-[14px] placeholder:pl-2"
          id={id}
          type={type ?? 'text'}
        />
      </div>
      <div className="opacity-50">{icon}</div>
    </div>
  );
};

const MyInput = (props) => {
  const id = useId();
  return (
    <motion.div
      className={`flex basis-${props.basis} items-center rounded-[18px] px-4 pt-1 pb-1.5 text-[18px] bg-gray-700 text-white border border-transparent border-solid focus-within:border-blue-800 shadow-[0_0_3px_2px_transparent] focus-within:shadow-blue-500 ${props.className}`}
    >
      <div className="flex flex-col w-full">
        <label className="text-[12px]  opacity-50" htmlFor={id}>
          {props.title}
        </label>
        <input
          required
          placeholder={props.placeholder}
          className=" outline-none border-none bg-transparent w-full font-[500] opacity-100 text-white"
          id={id}
          type={props.type ?? 'text'}
        />
      </div>
      <div className="opacity-50">{props.icon}</div>
    </motion.div>
  );
};

export const InputRadio = ({ list, width, title }) => {
  return (
    <div
      className={`w-${
        width ?? 'full'
      } rounded-md bg-transparent px-2 py-1 border border-slate-300 gap-y-2 flex flex-col`}
    >
      <span className="text-[14px] text-slate-400">{title}</span>
      {list.map((item) => (
        <div className="cursor-pointer flex w-full flex-col border border-slate-400 rounded-md px-2 py-0.5">
          <motion.label
            whileInView={{
              color: 'blue',
              fontWeight: 'bold',
            }}
            className=" select-none cursor-pointer text-[12px]  opacity-50 basis-1/3"
            htmlFor={item.title}
          >
            {item.title}
          </motion.label>
          <input
            required
            className="cursor-pointer text-[16px] text-slate-600 outline-none border-none bg-transparent w-full font-[500]"
            id={item.title}
            type="radio"
          />
        </div>
      ))}
    </div>
  );
};

export const InputArea = ({ width, rows, title, placeholder }) => {
  const id = useId();
  return (
    <div
      className={`w-${
        width ?? 'full'
      } rounded-md bg-transparent px-2 py-1 border border-slate-300 flex flex-col`}
    >
      <label className="text-[12px]  opacity-50 basis-1/3" htmlFor={id}>
        {title}
      </label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="placeholder:text-[14px] placeholder:pl-2 placeholder:font-normal text-[16px] text-slate-600 outline-none border-none bg-transparent w-full font-[500] resize-none"
        id={id}
        type="radio"
      />
    </div>
  );
};

export default MyInput;
