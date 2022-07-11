import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';

const ToastList = forwardRef((props, ref) => {
  const [toastList, setListToast] = useState([]);

  useImperativeHandle(ref, () => ({
    addToast: addToastHandler,
  }));

  function removeToastHandler(id) {
    setListToast((list) => list.filter((toast) => toast.id !== id));
  }

  function addToastHandler(toast) {
    setListToast((list) => list.concat({ ...toast, id: new Date().getTime() }));
  }

  return (
    <>
      '{' '}
      {createPortal(
        toastList.map((toast, index) => {
          return (
            <Toast
              key={toast.id}
              top={`${(index + 1) * 50}px`}
              message={toast.message}
              type={toast.type}
              onRemove={removeToastHandler.bind(null, toast.id)}
            />
          );
        }),
        document.getElementById('root'),
      )}
    </>
  );
});

export default ToastList;
