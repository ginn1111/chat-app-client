import React from 'react';
import { motion } from 'framer-motion';
import MyInput from '../ui/input/MyInput';
import MyButton from '../ui/button/MyButton';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Animation from '../../animation/Animation';
import { itemAnimate, slideInFromRight } from '../../animation/models/index';

const Login = (props) => {
  const animationIn = (i) => ({
    animate: { y: 0, opacity: 1 },
    initial: { y: -15, opacity: 0 },
    transition: { delay: i },
  });
  return (
    <Animation animationCreator={slideInFromRight}>
      <section className="pr-[100px] pt-[100px] flex flex-col items-end w-full ">
        <div className="flex flex-col items-start">
          <Animation animationCreator={itemAnimate.bind(null, 0)}>
            <h1 className="text-white text-3xl font-[600] relative after:absolute after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-blue-500 after:bottom-[5px] after:right-[-11px] before:w-[8px] before:h-[60%] before:bg-white before:absolute before:bottom-[20px] before:right-[-10px] before:rounded-[8px]">
              Welcome Back
            </h1>
          </Animation>
        </div>
        <form className="mt-5 flex flex-col  md:w-5/6 xl:w-2/5 gap-y-3">
          <Animation animationCreator={itemAnimate.bind(null, 0.1)}>
            <MyInput
              title="Email"
              basis="1"
              type="email"
              icon={<MarkunreadOutlinedIcon sx={{ fontSize: 22 }} />}
            />
          </Animation>
          <Animation animationCreator={itemAnimate.bind(null, 0.2)}>
            <MyInput
              title="Password"
              basis="1"
              type="password"
              icon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: 22 }} />}
            />
          </Animation>
          <Animation animationCreator={itemAnimate.bind(null, 0.3)}>
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
          </Animation>
          <Animation animationCreator={itemAnimate.bind(null, 0.4)}>
            <div className="mt-5 w-full">
              <MyButton
                title="Continue"
                bgColor="bg-blue-500"
                textColor="text-white"
                width="w-full"
              />
            </div>
          </Animation>
        </form>
      </section>
    </Animation>
  );
};

export default Login;
