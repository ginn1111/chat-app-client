import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import withToast from '@hoc/withToast';
import { register, resetStatus } from '@store/authen-slice';
import { getStatus } from '@store/selectors';
import ComingSoon from '../ui/error/ComingSoon';
import withModal from '@hoc/withModal';
import Input from '@/components/common/Input/index';
import Oauth from './components/Oauth';
import Button from '@/components/common/Button/index';
import {
  TwitterIcon,
  GoogleIcon,
  FacebookIcon,
} from '@components/common/icons';
import { PATHS } from '@constants/routers';

const Register = withToast(({ toast, modal }) => {
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === 'register/success') {
      toast.addToast({
        type: 'success',
        message: 'Create new account successfully!',
      });
      dispatch(resetStatus());
    }
    if (status === 'register/failed') {
      toast.addToast({
        type: 'error',
        message: 'Your email is exist account!',
      });
      dispatch(resetStatus());
    }
  }, [status, toast, dispatch]);

  function submitRegisterHandler(event) {
    event.preventDefault();

    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    const email = emailRef.current;
    const password = passwordRef.current;

    if (
      firstName.isInValid ||
      lastName.isInValid ||
      email.isInValid ||
      password.isInValid
    ) {
      return;
    }

    dispatch(
      register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      })
    );
  }

  function changeMethodHandler() {
    modal.open();
  }

  return (
    <>
      <h3 className="font-medium text-gray-700 text-28 mb-8">
        Register Account
      </h3>
      <p className="text-gray-500 text-16 mb-16">Get your account now</p>
      <form
        // onSubmit={submitLogInHandler}
        className="flex flex-col gap-y-16 w-5/12"
      >
        <Input
          label="Email"
          placeholder="Enter email"
        />
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
        <Button text="Register" />
        <div>
          <p className="text-center text-16 text-gray-600 mb-24">
            Sign up using
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
          Already have an account?{' '}
          <Link
            to={PATHS.LOGIN}
            className="underline text-primary"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
});

export default withModal(Register, ComingSoon);
