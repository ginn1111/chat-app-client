import React, { useState } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';

const Authentication = () => {
  const [toggleForm, setToggleForm] = useState(true);
  function toggleFormHandler() {
    setToggleForm((prev) => !prev);
  }

  return (
    <div className=" flex items-center w-full h-screen relative  bg-[url('../assets/img/background.jpg')] overflow-hidden justify-center my-[-10px] ">
      <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-[#4b5563de]">
        {!toggleForm && <Register onToggle={toggleFormHandler} />}
        {toggleForm && <Login onToggle={toggleFormHandler} />}
      </div>
    </div>
  );
};
export default Authentication;
