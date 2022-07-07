import React from 'react';
import MyInput from '../ui/input/MyInput';
import MyButton from '../ui/button/MyButton';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Register = (props) => {
  return (
    <section className="m-[100px] flex flex-col items-start w-full animate-[slide-from-left_0.5s_linear_forwards]">
      <div className="flex flex-col items-start">
        <h1 className="text-white text-3xl font-[600] relative after:w-[10px] after:h-[10px] after:absolute after:rounded-[50%] after:bottom-1 after:right-[-10px] after:bg-blue-400">
          Create new Account
        </h1>
        <span className="text-[16px] py-1.5">
          <span className="tracking-wider text-gray-400 after:content-[test]">
            Already a member?
          </span>
          <span
            onClick={props.onToggle}
            className="cursor-pointer no-underline text-blue-500"
          >
            {' '}
            Login
          </span>
        </span>
      </div>
      <form className="mt-5 flex flex-col  md:w-5/6 xl:w-2/5 gap-y-3">
        <div className="w-full flex gap-x-3">
          <MyInput
            title="First name"
            basis="1/2"
            icon={<FeedOutlinedIcon sx={{ fontSize: 22 }} />}
          />
          <MyInput
            title="Last name"
            basis="1/2"
            icon={<FeedOutlinedIcon sx={{ fontSize: 22 }} />}
          />
        </div>
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
        <div className="flex gap-x-5 mt-5">
          <MyButton
            title="Change method"
            bgColor="bg-gray-500"
            textColor="text-white"
            width="w-1/2"
          />
          <MyButton
            title="Create account"
            bgColor="bg-blue-500"
            textColor="text-white"
            width="w-1/2"
          />
        </div>
      </form>
    </section>
  );
};

export default Register;
