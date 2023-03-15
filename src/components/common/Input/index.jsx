import React, { useId } from 'react';
import usePassword from './usePassword';
import { EyeIcon, HiddenEyeIcon } from '@components/common/icons';

const Input = ({ label, type, ...props }) => {
  const [isShowPassword, setIsShowPassword] = usePassword(type === 'password');
  const isPassword = type === 'password';
  const id = useId();

  return (
    <div className="flex flex-col gap-12 text-16 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-16 text-gray-600 font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          spellCheck={false}
          type={isPassword && !isShowPassword ? 'password' : 'text'}
          className="placeholder:text-[14px] px-16 py-8 rounded-sm border border-solid border-gray-200 text-gray-700 w-full font-light"
          {...props}
        />
        {isShowPassword !== null && (
          <button
            disabled={props.disabled}
            type="button"
            className="absolute right-8 bottom-0 top-0 my-auto cursor-pointer"
            onClick={() => setIsShowPassword((isShow) => !isShow)}
          >
            {!isShowPassword && (
              <EyeIcon
                className="text-gray-400"
                size={24}
              />
            )}
            {isShowPassword && (
              <HiddenEyeIcon
                className="text-gray-400"
                size={24}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
