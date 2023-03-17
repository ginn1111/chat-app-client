import { memo } from 'react';
import { Link } from 'react-router-dom';

import withToast from '@hoc/withToast';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input/index';
import Oauth from '../components/Oauth';
import Button from '@components/common/Button/index';
import {
  TwitterIcon,
  GoogleIcon,
  FacebookIcon,
} from '@components/common/icons';
import PATHS from '@constants/paths';
import useRegister from './useRegister';
import commonErrorHandler from '@axios/errorHandler';
import { ErrorCode } from '@constants';
import { ToastType } from '@components/ui/notification/Toast';
import ResponseMessage from '@constants/messages';

const Register = withToast(({ toast }) => {
  const { state, formik } = useRegister({
    onSuccess() {
      toast({ message: ResponseMessage.REGISTER_SUCCESSFULLY });
    },
    onError(errorCode) {
      const message = commonErrorHandler(errorCode);
      if (message) {
        toast({ message, type: ToastType.ERROR });
        return;
      }
      switch (errorCode) {
        //[409]
        case ErrorCode.CONFLICT:
          toast({
            message: ResponseMessage.EMAIL_IN_USED,
            type: ToastType.ERROR,
          });
          break;
        default:
          toast({
            message: ResponseMessage.SOME_THING_WENT_WRONG,
            type: ToastType.ERROR,
          });
      }
    },
  });

  return (
    <>
      <h3 className="font-medium text-gray-700 text-28 mb-8">
        Register Account
      </h3>
      <p fuck="text-gray-500 text-16 mb-16">Get your account now</p>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-y-16 w-5/12"
      >
        <Input
          label="Email"
          placeholder="Enter email"
          disabled={state.isLoading}
          {...formik.getFieldProps('email')}
        />
        {state.isEmailError && <ErrorMessage errorMsg={formik.errors.email} />}
        <Input
          label="Username"
          placeholder="Enter username"
          disabled={state.isLoading}
          {...formik.getFieldProps('username')}
        />
        {state.isUsernameError && (
          <ErrorMessage errorMsg={formik.errors.username} />
        )}
        <div className="flex flex-col gap-12">
          <p className="flex justify-between text-16 text-gray-600 font-medium">
            <label htmlFor="password" className="text-16">
              Password
            </label>
            <button tabIndex="-1" className="text-gray-400 font">
              Forgot password?
            </button>
          </p>
          <Input
            placeholder="Enter password"
            type="password"
            disabled={state.isLoading}
            {...formik.getFieldProps('password')}
          />
          {state.isPasswordError && (
            <ErrorMessage errorMsg={formik.errors.password} />
          )}
        </div>
        <p className="flex items-center gap-12 text-[14px] text-gray-600 font-medium">
          By registering you agree to the Echat{' '}
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-[14px]"
          >
            Terms of Use
          </a>
        </p>
        <Button type="submit" text="Register" isLoading={state.isLoading} />
        <div>
          <p className="text-center text-16 text-gray-600 mb-24">
            Sign up using
          </p>
          <div className="flex gap-12">
            <Oauth icon={<GoogleIcon />} className="text-red-500" />
            <Oauth icon={<FacebookIcon />} className="text-fbColor" />
            <Oauth icon={<TwitterIcon />} className="text-twitterColor" />
          </div>
        </div>
        <p className="text-16 text-gray-400 mx-auto mt-48">
          Already have an account?{' '}
          <Link to={PATHS.LOGIN} className="underline text-primary">
            Login
          </Link>
        </p>
      </form>
    </>
  );
});

export default memo(Register);
