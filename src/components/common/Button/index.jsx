import React from 'react';
import clsx from 'clsx';

function Button({ text, className, isLoading, ...props }) {
  return (
    <button
      className={clsx(
        'bg-primary rounded-sm text-center text-white py-8 text-16 hover:brightness-95 transition-all flex items-center justify-center gap-12 disabled:brightness-90 disabled:bg-primary',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin h-20 w-20 border-4 border-t-white rounded-cir" />
      )}
      {text}
    </button>
  );
}

export default Button;
