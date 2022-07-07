import React from 'react';
import MyInput from '../ui/input/MyInput';
import MyButton from '../ui/button/MyButton';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Login = (props) => {
  return (
    <section className="pr-[100px] pt-[100px] flex flex-col items-end w-full animate-[slide-from-right_0.5s_linear_forwards] ">
      <div className="flex flex-col items-start">
        <h1 className="text-white text-3xl font-[600] relative after:absolute after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-blue-500 after:bottom-[5px] after:right-[-11px] before:w-[8px] before:h-[60%] before:bg-white before:absolute before:bottom-[20px] before:right-[-10px] before:rounded-[8px]">
          Welcome Back
        </h1>
      </div>
      <form className="mt-5 flex flex-col  md:w-5/6 xl:w-2/5 gap-y-3">
        <MyInput
          title="Email"
          basis="1"
          type="email"
          icon={<MarkunreadOutlinedIcon sx={{ fontSize: 22 }} />}
        />
        <MyInput
          title="Password"
          basis="1"
          type="password"
          icon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: 22 }} />}
        />
        <div className="ml-2 flex  justify-between">
          <span className="text-[16px] text-white opacity-50">
            <span>Don't have account?</span>
            <span
              onClick={props.onToggle}
              className="text-blue-500 cursor-pointer"
            >
              {' '}
              Register
            </span>
          </span>
          <div className="flex gap-x-5 items-center">
            <input
              id="remember"
              className="w-[15px] h-[15px] cursor-pointer"
              type="checkbox"
            />
            <label
              htmlFor="remember"
              className="text-[16px] text-white opacity-50 select-none cursor-pointer"
            >
              Remember me
            </label>
          </div>
        </div>
        <div className="mt-5 w-full">
          <MyButton
            title="Continue"
            bgColor="bg-blue-500"
            textColor="text-white"
            width="w-full"
          />
        </div>
      </form>
    </section>
  );
};

export default Login;
