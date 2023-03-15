import { useFormik } from 'formik';
import { login } from '@services/authentication';
import { useState } from 'react';
import { loginSchema } from '@constants';
import useAbort from 'src/hooks/useAbort';

const useLogin = ({
  onSuccess,
  onError,
  initialValues: { email = '', password = '', rememberMe = false } = {},
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const signal = useAbort();

  const formik = useFormik({
    initialValues: {
      email,
      password,
      rememberMe,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setIsLogin(true);
        const response = await login({ ...values }, { signal });
        onSuccess(response);
      } catch (error) {
        onError(error);
      } finally {
        setIsLogin(false);
      }
    },
  });

  const isLoading = formik.isSubmitting || isLogin;
  const isPasswordError = formik.touched.password && formik.errors.password;
  const isEmailError = formik.touched.email && formik.errors.email;

  return { state: { isLoading, isPasswordError, isEmailError }, formik };
};

export default useLogin;
