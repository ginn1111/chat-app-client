import React from 'react';
import cx from 'clsx';

const ButtonType = {
  Solid: 'solid',
  Outline: 'outline',
};

function Button({
  variant = ButtonType.Solid,
  text,
  children,
  className,
  isLoading,
  ...props
}) {
  const variants = {
    [ButtonType.Solid]: {
      btn: 'bg-primary text-white disabled:bg-primary',
      loading: 'border-t-white ',
    },
    [ButtonType.Outline]: {
      btn: 'bg-transparent ring-1 ring-primary text-primary hover:bg-primary hover:text-white transition-all',
      loading: 'border-t-primary',
    },
  };

  return (
    <button
      className={cx(
        'rounded-sm text-center py-8 text-16 hover:brightness-95 transition-all flex items-center justify-center gap-12 disabled:brightness-90',
        variants[variant].btn,
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <div
          className={cx(
            'animate-spin h-20 w-20 border-4 rounded-cir',
            variants[variant].loading
          )}
        />
      )}
      {children || text}
    </button>
  );
}

export default Button;
