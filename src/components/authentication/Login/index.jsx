import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import withToast from '../../../hoc/withToast';
import { login, resetStatus } from '../../../store/authen-slice';
import { getStatus } from '../../../store/selectors';
import { bgLogin } from '@/constants';
import Input from '@/components/common/input';
import Checkbox from '@/components/common/checkbox';
import Button from '@/components/common/button';
import {
  TwitterIcon,
  GoogleIcon,
  FacebookIcon,
  ChatIcon,
} from '@/components/common/icons';

const Oauth = ({ icon, className, ...props }) => {
  return (
    <button
      className={clsx(
        'py-8 flex justify-center bg-gray-100 px-16 border border-transparent border-solid hover:border-gray-200 hover:brightness-90 transition-colors flex-1 rounded-sm',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};

const Login = withToast(({ toast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(getStatus);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === 'login/failed') {
      toast.addToast({
        message: 'Login failed, invalid email or password!',
        type: 'error',
      });
    } else if (status === 'login/success') {
      navigate(location?.state?.from ?? '/');
    }
    if (status !== 'login/pending' && status !== 'idle') {
      dispatch(resetStatus());
    }
  }, [status, toast, dispatch, navigate, location?.state?.from]);

  function submitLogInHandler(event) {
    event.preventDefault();

    const email = emailRef.current;
    const password = passwordRef.current;

    if (email.isInValid || password.isInValid) {
      return;
    }

    dispatch(login({ email: email.value, password: password.value }));
  }

  return (
    <section className="grid grid-cols-12 h-full">
      <div className="col-span-4 p-48 flex flex-col justify-between">
        <div className="flex items-center gap-12 text-white">
          <ChatIcon
            size="28"
            className="text-white"
          />
          <h1 className="text-28 font-black m-0">Echat</h1>
        </div>
        <div className="w-[50vw] relative z-1 max-h-[600px]">
          <img
            className="block w-full h-full object-contain"
            src={bgLogin}
            alt="background of login screen"
          />
        </div>
      </div>
      <div className="col-span-8 bg-white p-24 m-24 rounded-md flex flex-col items-center justify-center">
        <h3 className="font-medium text-gray-700 text-28 mb-8">
          Welcome Back !
        </h3>
        <p className="text-gray-500 text-16 mb-16">
          Sign in to continue to Echat
        </p>
        <form
          onSubmit={submitLogInHandler}
          className="flex flex-col gap-y-16 w-1/3"
        >
          <Input
            label="Username"
            placeholder="Enter username"
          />
          <div className="flex flex-col gap-12">
            <p className="flex justify-between text-16 text-gray-600 font-medium">
              <label
                htmlFor="password"
                className="text-16"
              >
                Password
              </label>
              <button
                tabIndex="-1"
                className="text-gray-400 font"
              >
                Forgot password?
              </button>
            </p>
            <Input
              id="password"
              placeholder="Enter password"
              type="password"
            />
          </div>
          <label className="flex items-center gap-12 cursor-pointer">
            <Checkbox />
            <p className="text-[14px] text-gray-600 font-medium">Remember me</p>
          </label>
          <Button text="Log In" />
          <div>
            <p className="text-center text-16 text-gray-600 mb-24">
              Log In With
            </p>
            <div className="flex gap-12">
              <Oauth
                icon={<GoogleIcon />}
                className="text-red-500"
              />
              <Oauth
                icon={<FacebookIcon />}
                className="text-fbColor"
              />
              <Oauth
                icon={<TwitterIcon />}
                className="text-twitterColor"
              />
            </div>
          </div>
          <p className="text-16 text-gray-400 mx-auto mt-48">
            Don't have account?{' '}
            <Link
              to={'/register'}
              className="underline text-primary"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
});

export default Login;
