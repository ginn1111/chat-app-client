import React from 'react';
import cx from 'clsx';

function ErrorMessage({ errorMsg, className }) {
  return <p className={cx('text-red-400', className)}>{errorMsg}</p>;
}

export default ErrorMessage;
