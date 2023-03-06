import React from 'react';
import clsx from 'clsx';

function Button({ text, className }) {
  return (
    <button
      className={clsx(
        'bg-primary rounded-sm text-center text-white py-8 text-16 hover:brightness-95 transition-all',
        className
      )}
    >
      {text}
    </button>
  );
}

export default Button;
