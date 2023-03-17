import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/ui/notification/Toast';

const withToast = (WrappedComponent) => {
  return (props) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
      setToasts((toasts) => [...toasts, { ...toast, id: Date.now() }]);
    }, []);

    return (
      <>
        {createPortal(
          <div className="fixed top-60 right-28 z-[11] flex flex-col items-stretch">
            {toasts.map(({ id, ...toast }) => (
              <Toast {...toast} key={id} />
            ))}
          </div>,
          document.getElementById('root')
        )}
        <WrappedComponent {...props} toast={addToast} />
      </>
    );
  };
};

export default withToast;
