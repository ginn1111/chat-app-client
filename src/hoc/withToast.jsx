import React, { useMemo, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/ui/notification/Toast';

const withToast = (WrappedComponent) => {
  return (props) => {
    const [toastList, setListToast] = useState([]);

    const removeToastHandler = useCallback((id) => {
      setListToast((list) => list.filter((toast) => toast.id !== id));
    }, []);

    const addToastHandler = useCallback((toast) => {
      setListToast((list) =>
        list.concat({ ...toast, id: new Date().getTime() }),
      );
    }, []);

    const toast = useMemo(
      () => ({ addToast: addToastHandler }),
      [addToastHandler],
    );

    return (
      <>
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
        <WrappedComponent {...props} toast={toast} />
      </>
    );
  };
};

export default withToast;
