import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import MyInput from '../ui/input/MyInput';
import MyButton from '../ui/button/MyButton';
import Animation from '../../animation/Animation';
import withToast from '../../hoc/withToast';
import { itemAnimate, slideInFromRight } from '../../animation/models/index';
import { validateEmail, validateEmpty } from '../../utils/validate';
import { login, resetStatus } from '../../store/authen-slice';
import { getStatus } from '../../store/selectors';

const Login = withToast((props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(getStatus);
  const iconSize = { fontSize: 22 };

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === 'login/failed') {
      props.toast.addToast({
        message: 'Login failed, invalid email or password!',
        type: 'error',
      });
    }
    dispatch(resetStatus());
    if (status === 'login/success') {
      navigate(location?.state?.from ?? '/wall/me');
      dispatch(resetStatus());
    }
  }, [status]);

  useEffect(() => {
    emailRef.current.setValue('vanthuanjw@gmail.com');
    passwordRef.current.setValue('Thu@n12312');
  }, []);

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
              icon={<MarkunreadOutlinedIcon sx={iconSize} />}
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
              icon={<RemoveRedEyeOutlinedIcon sx={iconSize} />}
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
});

export default Login;
