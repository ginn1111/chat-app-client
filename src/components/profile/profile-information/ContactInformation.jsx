import React, { useState, useEffect, useRef } from 'react';
import { HeaderProfile, InputInformation } from '../profile-input/ProfileInput';
import { UilEnvelopeAlt, UilPhone } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/selectors';
import { validateEmail, validatePhone } from '../../../utils/validate';
import { updateUser } from '../../../store/authen-slice';

const ContactInformation = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(null);

  const phoneRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    phoneRef.current.setValue(user.phone);
    emailRef.current.setValue(user.email);
  }, [user]);

  useEffect(() => {
    if (isUpdate === null) {
      return;
    }
    if (!isUpdate) {
      console.log('submit', {
        phone: phoneRef.current.value,
        email: emailRef.current.value,
      });
      dispatch(
        updateUser({
          ...user,
          phone: phoneRef.current.value,
          email: emailRef.current.value,
        }),
      );
    } else {
      emailRef.current.focus();
    }
  }, [isUpdate]);

  function toggleUpdateHandler() {
    // const isValid = phoneRef.current.isValid && emailRef.current.isValid;
    // if (!isValid) return;

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
        validateFunction={validateEmail}
        errorText="Email is invalid!"
      />
      <InputInformation
        readOnly={!isUpdate}
        ref={phoneRef}
        title="Phone"
        icon={<UilPhone size="20" className="text-slate-400" />}
        validateFunction={validatePhone}
        errorText="Phone is invalid!"
      />
    </div>
  );
};

export default ContactInformation;
