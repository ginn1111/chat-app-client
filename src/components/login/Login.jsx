import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MyInput from '../ui/input/MyInput';
import MyButton from '../ui/button/MyButton';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Animation from '../../animation/Animation';
import { itemAnimate, slideInFromRight } from '../../animation/models/index';
import { validateEmail, validateEmpty } from '../../utils/validate';
import { loginThunk, resetStatus } from '../../store/authen-slice';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, getToken } from '../../store/selectors';
import ProcessBar from '../ui/loading/ProcessBar';
import ToastList from '../ui/notification/ToastList';

const Login = (props) => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const token = useSelector(getToken);

  const toastRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === 'login/failed') {
      toastRef.current.addToast({
        message: 'Login failed, try again!',
        type: 'error',
      });
      dispatch(resetStatus());
    }
  }, [status, token]);

  useEffect(() => {
    emailRef.current.setValue('vanthuanjw@gmail.com');
    passwordRef.current.setValue('Thu@n12312');
  }, []);

  function rememberMeHandler({ target: { checked } }) {}

  function submitLogInHandler(event) {
    event.preventDefault();

    const email = emailRef.current;
    const password = passwordRef.current;

    if (email.isInValid || password.isInValid) {
      email.blur();
      password.blur();
      return;
    }

    dispatch(loginThunk({ email: email.value, password: password.value }));
  }

  return (
    <>
      <ProcessBar isShow={status === 'login/pending'} />
      <ToastList ref={toastRef} />
      <Animation animationCreator={slideInFromRight}>
        <section className="pr-[100px] pt-[100px] h-full flex flex-col items-end w-full ">
          <div className="flex flex-col items-start">
            <Animation animationCreator={itemAnimate.bind(null, 0)}>
              <h1 className="text-white text-3xl font-[600] relative after:absolute after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-blue-500 after:bottom-[5px] after:right-[-11px] before:w-[8px] before:h-[60%] before:bg-white before:absolute before:bottom-[20px] before:right-[-10px] before:rounded-[8px]">
                Welcome Back
              </h1>
            </Animation>
          </div>
          <form
            onSubmit={submitLogInHandler}
            className="mt-5 flex flex-col  md:w-5/6 xl:w-2/5 gap-y-3"
          >
            <Animation animationCreator={itemAnimate.bind(null, 0.1)}>
              <MyInput
                validationFunction={validateEmail}
                errorText="Email is not valid!"
                ref={emailRef}
                title="Email"
                basis="1"
                type="email"
                icon={<MarkunreadOutlinedIcon sx={{ fontSize: 22 }} />}
              />
            </Animation>
            <Animation animationCreator={itemAnimate.bind(null, 0.2)}>
              <MyInput
                validationFunction={validateEmpty}
                errorText="Password is not empty!"
                ref={passwordRef}
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
                    onChange={rememberMeHandler}
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
    </>
  );
};

export default Login;
