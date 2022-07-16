import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/ui/notification/Toast';

const withToast = (WrappedComponent) => {
  return (props) => {
    const [toastList, setListToast] = useState([]);

    function removeToastHandler(id) {
      setListToast((list) => list.filter((toast) => toast.id !== id));
    }

    function addToastHandler(toast) {
      setListToast((list) =>
        list.concat({ ...toast, id: new Date().getTime() }),
      );
    }
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
        <WrappedComponent {...props} toast={{ addToast: addToastHandler }} />
      </>
    );
  };
};

export default withToast;
