import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { SliceName } from '@app/selectors';
import { loginSchema } from '@constants';
import { loginThunk, resetAction } from '@features/authentication/userSlice';
import { loadingStatusGeneratorSelector } from 'src/app/selectors';
import { LoadingStatus } from '@features/constants';
import { PATHS } from '@constants/routers';

const useLogin = ({ email = '', password = '', rememberMe = false } = {}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    loadingStatusGeneratorSelector(SliceName.USER)
  );
  const abortRef = useRef();

  const formik = useFormik({
    initialValues: {
      email,
      password,
      rememberMe,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      abortRef.current = dispatch(loginThunk(values));
    },
  });

  const isLoading = loadingStatus.status === LoadingStatus.PENDING;
  const isSuccess = loadingStatus.status === LoadingStatus.FULFILLED;
  const isReqError = loadingStatus.status === LoadingStatus.REJECTED;
  const errorMsg = loadingStatus.responseMessage;

  const isPasswordError = formik.touched.password && formik.errors.password;
  const isEmailError = formik.touched.email && formik.errors.email;

  useEffect(
    () => () => {
      abortRef.current && abortRef.current.abort();
    },
    []
  );

  useEffect(() => () => dispatch(resetAction()), []);

  useEffect(() => {
    if (isSuccess) {
      navigate(PATHS.CHAT);
    }
  }, [isSuccess]);

  return {
    state: { isLoading, isPasswordError, isEmailError, isReqError, errorMsg },
    formik,
  };
};

export default useLogin;
