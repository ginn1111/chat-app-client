import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import withToast from '@hoc/withToast';
import { login, resetStatus } from '@store/authen-slice';
import { getStatus } from '@store/selectors';
import Input from '@/components/common/Input';
import Checkbox from '@/components/common/Checkbox';
import Button from '@/components/common/Button';
import {
  TwitterIcon,
  GoogleIcon,
  FacebookIcon,
} from '@components/common/icons';
import Oauth from '../components/Oauth';
import { PATHS } from '@constants/routers';

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
    <>
      <h3 className="font-medium text-gray-700 text-28 mb-8">Welcome Back !</h3>
      <p className="text-gray-500 text-16 mb-16">
        Sign in to continue to Echat
      </p>
      <form
        onSubmit={submitLogInHandler}
        className="flex flex-col gap-y-16 w-5/12"
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
          <p className="text-center text-16 text-gray-600 mb-24">Log In With</p>
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
            to={PATHS.REGISTER}
            className="underline text-primary"
          >
            Register
          </Link>
        </p>
      </form>
    </>
  );
});

export default Login;
