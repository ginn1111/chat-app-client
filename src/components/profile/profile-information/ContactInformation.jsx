import React, { useState, useEffect, useRef } from 'react';
import { HeaderProfile, InputInformation } from '../profile-input/ProfileInput';
import { UilEnvelopeAlt, UilPhone } from '@iconscout/react-unicons';

const ContactInformation = () => {
  const [isUpdate, setIsUpdate] = useState(null);

  const phoneRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    if (isUpdate === null) {
      return;
    }
    if (!isUpdate) {
      console.log('submit', {
        phone: phoneRef.current.value,
        email: emailRef.current.value,
      });
    } else {
      emailRef.current.focus();
    }
  }, [isUpdate]);

  function toggleUpdateHandler() {
    setIsUpdate((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col items-center gap-y-2">
      <HeaderProfile
        title="Contact Information"
        isUpdate={isUpdate}
        onToggleUpdate={toggleUpdateHandler}
      />
      <InputInformation
        readOnly={!isUpdate}
        ref={emailRef}
        title="Email"
        type="email"
        icon={<UilEnvelopeAlt size="20" className="text-slate-400" />}
      />
      <InputInformation
        readOnly={!isUpdate}
        ref={phoneRef}
        title="Phone"
        type="number"
        icon={<UilPhone size="20" className="text-slate-400" />}
      />
    </div>
  );
};

export default ContactInformation;
