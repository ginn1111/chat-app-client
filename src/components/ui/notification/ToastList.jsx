import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

const ToastList = forwardRef((ref) => {
  const [toastList, setListToast] = useState([]);

  useImperativeHandle(ref, () => ({
    addToast: addToastHandler,
  }));

  const removeToastHandler = useCallback((id) => {
    setListToast((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const addToastHandler = (toast) => {
    setListToast((list) => list.concat({ ...toast, id: new Date().getTime() }));
  };

  return (
    <>
      {createPortal(
        toastList.map((toast, index) => {
          return (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onRemove={removeToastHandler.bind(null, toast.id)}
            />
          );
        }),
        document.getElementById("root")
      )}
    </>
  );
});

export default ToastList;
