import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useLogin from './useLogin';
import withToast from '@hoc/withToast';
import Input from '@components/common/Input';
import Checkbox from '@components/common/Checkbox';
import Button from '@components/common/Button';
import {
  TwitterIcon,
  GoogleIcon,
  FacebookIcon,
} from '@components/common/icons';
import Oauth from '../components/Oauth';
import PATHS from '@constants/paths';
import ErrorMessage from '@components/common/ErrorMessage';
import { ToastType } from '@components/ui/notification/Toast';

const Login = withToast(({ toast }) => {
  const { state, formik } = useLogin({
    email: 'vanthuanjw@gmail.com',
    password: 'Thu@n1231213011',
  });

  useEffect(() => {
    if (state.isReqError) {
      toast({
        type: ToastType.ERROR,
        message: state.errorMsg,
        autoClose: false,
      });
    }
  }, [state.isReqError]);

  return (
    <>
      <h3 className="font-medium text-gray-700 text-28 mb-8">Welcome Back !</h3>
      <p className="text-gray-500 text-16 mb-16">
        Sign in to continue to Echat
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-y-16 w-5/12"
      >
        <Input
          disabled={state.isLoading}
          label="Email"
          placeholder="Enter email"
          {...formik.getFieldProps('email')}
        />
        {state.isEmailError && <ErrorMessage errorMsg={formik.errors.email} />}
        <div className="flex flex-col gap-12">
          <p className="flex justify-between text-16 text-gray-600 font-medium">
            <label htmlFor="password" className="text-16">
              Password
            </label>
            <button type="button" tabIndex="-1" className="text-gray-400 font">
              Forgot password?
            </button>
          </p>
          <Input
            disabled={state.isLoading}
            placeholder="Enter password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          {state.isPasswordError && (
            <ErrorMessage errorMsg={formik.errors.password} />
          )}
        </div>
        <label
          className="flex items-center gap-12 cursor-pointer"
          htmlFor="rememberMe"
        >
          <Checkbox
            disabled={state.isLoading}
            id="rememberMe"
            {...formik.getFieldProps('rememberMe')}
          />
          <p className="text-[14px] text-gray-600 font-medium">Remember me</p>
        </label>
        <Button type="submit" text="Log In" isLoading={state.isLoading} />
        <div>
          <p className="text-center text-16 text-gray-600 mb-24">Log In With</p>
          <div className="flex gap-12">
            <Oauth icon={<GoogleIcon />} className="text-red-500" />
            <Oauth icon={<FacebookIcon />} className="text-fbColor" />
            <Oauth icon={<TwitterIcon />} className="text-twitterColor" />
          </div>
        </div>
        <p className="text-16 text-gray-400 mx-auto mt-48">
          Don't have account?{' '}
          <Link to={PATHS.REGISTER} className="underline text-primary">
            Register
          </Link>
        </p>
      </form>
    </>
  );
});

export default memo(Login);
