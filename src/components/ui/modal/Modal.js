import React from 'react';

const Modal = ({ children }) => {
  return (
    <div className="absolute-x-center top-[50%] translate-y-[-50%]">
      {children}
    </div>
  );
};

export default Modal;
