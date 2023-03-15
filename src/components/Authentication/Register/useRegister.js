import { useState } from 'react';
import { useFormik } from 'formik';

import { register } from '@services/authentication';
import * as schemas from '@constants';
import useAbort from 'src/hooks/useAbort';

const useRegister = ({
  onSuccess,
  onError,
  initialValues: { email = '', username = '', password = '' } = {},
}) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const signal = useAbort();

  const formik = useFormik({
    initialValues: {
      email,
      username,
      password,
    },
    validationSchema: schemas.registerSchema,
    onSubmit: async (values) => {
      try {
        setIsRegistering(true);
        const { response } = await register(
          { ...values, firstName: values.username, lastName: values.username },
          { signal }
        );
        onSuccess(response);
      } catch (e) {
        onError(e);
      } finally {
        setIsRegistering(false);
      }
    },
  });

  const isLoading = formik.isSubmitting || isRegistering;
  const isEmailError = formik.touched.email && formik.errors.email;
  const isUsernameError = formik.touched.username && formik.errors.username;
  const isPasswordError = formik.touched.password && formik.errors.password;

  return {
    state: {
      isLoading,
      isEmailError,
      isUsernameError,
      isPasswordError,
    },
    formik,
  };
};

export default useRegister;
