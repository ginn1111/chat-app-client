import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { DURATION_UI_TOAST_LEAVE } from '@constants';
import { CloseIcon, TickIcon, WarnIcon } from '@components/common/icons';

const ToastIcon = ({ icon, bg }) => (
  <div className={`p-4 ${bg} rounded-cir text-white`}>{icon}</div>
);

const DURATION = 3000;

export const ToastType = {
  ERROR: 'error',
  SUCCESS: 'success',
};

const Toast = ({ type, message, autoClose = true }) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const idTimer = setTimeout(() => {
        setShowToast(false);
      }, DURATION + DURATION_UI_TOAST_LEAVE);
      return () => clearTimeout(idTimer);
    }
  }, []);

  const typeToast =
    type === ToastType.ERROR
      ? {
          bg: 'bg-red-500',
          borderColor: 'border-red-500',
          icon: (
            <ToastIcon
              bg="bg-gradient-to-r from-red-500 to-orange-300"
              icon={<WarnIcon />}
            />
          ),
        }
      : {
          bg: 'bg-green-500',
          borderColor: 'border-green-500',
          icon: (
            <ToastIcon
              bg="bg-gradient-to-r from-green-500 to-blue-300"
              icon={<TickIcon />}
            />
          ),
        };
  return (
    <Transition
      enter="transition-transform duration-300"
      leave="transition-transform duration-300"
      enterFrom="translate-x-[120%]"
      enterTo="translate-x-0"
      leaveTo="translate-x-[120%]"
      leaveFrom="translate-x-0"
      show={showToast}
      className={`toast overflow-hidden relative border-l-4 flex bg-white ${typeToast.borderColor}`}
      appear
    >
      {typeToast.icon}
      <p className="flex-1 mr-16">{message}</p>
      <button
        tabIndex={0}
        onClick={setShowToast.bind(null, false)}
        className="absolute top-8 right-16"
      >
        <CloseIcon size={16} />
      </button>
      {autoClose && (
        <div
          className={`absolute inset-0 top-[unset] h-4 animate-toast-auto-close ${typeToast.bg}`}
        />
      )}
    </Transition>
  );
};

export default Toast;
