import React, { useState, useEffect, useRef } from 'react';
import {
  HeaderProfile,
  InputInformation,
  RadioInputInformation,
  TextAreaInformation,
} from '../profile-input/ProfileInput';
import {
  UilUser,
  UilFont,
  UilUsersAlt,
  UilSignRight,
  UilCalender,
} from '@iconscout/react-unicons';

const LIST_GENDER = [
  { title: 'Nam', value: 'Male' },
  { title: 'Nữ', value: 'Female' },
  { title: 'Khác', value: 'Other' },
];

const BasicInformation = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const isFirstRef = useRef(true);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const sloganRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }
    if (!isUpdate) {
      console.log('submit', {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        dob: dobRef.current.value,
        slogan: sloganRef.current.value,
        address: addressRef.current.value,
        gender: genderRef.current.value,
      });
    }
  }, [isUpdate]);

  function toggleUpdateHandler() {
    setIsUpdate((prevState) => !prevState);
  }

  const colorIcon = 'text-slate-400';
  return (
    <div className="w-1/2 flex flex-col gap-y-2 items-center">
      <HeaderProfile
        title="Information"
        onToggleUpdate={toggleUpdateHandler}
        isUpdate={isUpdate}
      />
      <InputInformation
        ref={firstNameRef}
        readOnly={!isUpdate}
        title="First name"
        icon={<UilUser className={colorIcon} />}
      />
      <InputInformation
        ref={lastNameRef}
        readOnly={!isUpdate}
        title="Last name"
        icon={<UilUser className={colorIcon} />}
      />
      <InputInformation
        ref={dobRef}
        readOnly={!isUpdate}
        type="date"
        title="Day of birth"
        icon={<UilCalender className={colorIcon} />}
      />
      <InputInformation
        ref={sloganRef}
        readOnly={!isUpdate}
        title="Slogan"
        icon={<UilFont className={colorIcon} />}
      />
      <RadioInputInformation
        ref={genderRef}
        readOnly={!isUpdate}
        list={LIST_GENDER}
        title="Giới tính"
        icon={<UilUsersAlt className={colorIcon} />}
      />
      <TextAreaInformation
        ref={addressRef}
        readOnly={!isUpdate}
        rows={3}
        title="Address"
        icon={<UilSignRight className={colorIcon} />}
      />
    </div>
  );
};

export default BasicInformation;
