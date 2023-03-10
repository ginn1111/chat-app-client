import { useState } from 'react';
const usePassword = (isPassword) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return [
    !isPassword ? null : isShowPassword,
    !isPassword ? null : setIsShowPassword,
  ];
};

export default usePassword;
