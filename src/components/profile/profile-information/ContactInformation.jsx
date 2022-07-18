import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { HeaderProfile, InputInformation } from '../profile-input/ProfileInput';
import { UilEnvelopeAlt, UilPhone } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/selectors';
import { validateEmail, validatePhone } from '../../../utils/validate';
import withUpdateUser from '../../../hoc/withUpdateUser';
import { checkInputIsValid } from '../../../utils/helper';

const ContactInformation = withUpdateUser(
  forwardRef(({ onUpdate, isUpdate, onShowUpdate, onReset }, ref) => {
    const user = useSelector(getUser);

    const phoneRef = useRef();
    const emailRef = useRef();

    useImperativeHandle(ref, () => ({
      userData: {
        phoneRef,
        emailRef,
      },
      setDefaultValue() {
        phoneRef.current.setValue(user.phone);
        emailRef.current.setValue(user.email);
      },
      checkValid() {
        return checkInputIsValid(phoneRef, emailRef);
      },
      focus() {
        emailRef.current.focus();
      },
    }));

    return (
      <div className="flex flex-col items-center gap-y-2">
        <HeaderProfile
          title="Contact Information"
          onShowUpdate={onShowUpdate}
          onUpdate={onUpdate}
          isUpdate={isUpdate}
          onReset={onReset}
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
  }),
);

export default ContactInformation;
