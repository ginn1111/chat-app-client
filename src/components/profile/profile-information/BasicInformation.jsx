import React, { useState, useEffect, useRef } from 'react';
import {
  HeaderProfile,
  InputInformation,
  RadioInputInformation,
  TextAreaInformation,
} from '../profile-input/ProfileInput';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/selectors';
import {
  UilUser,
  UilFont,
  UilUsersAlt,
  UilSignRight,
  UilCalender,
} from '@iconscout/react-unicons';
import { formatDate } from '../../../utils/helper';
import { updateUser } from '../../../store/authen-slice';
import { validateEmpty } from '../../../utils/validate';

const LIST_GENDER = [
  { title: 'Nam', value: 'male' },
  { title: 'Nữ', value: 'female' },
  { title: 'Khác', value: 'other' },
];

const BasicInformation = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [isUpdate, setIsUpdate] = useState(null);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const sloganRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    firstNameRef.current.setValue(user.firstName);
    lastNameRef.current.setValue(user.lastName);
    dobRef.current.setValue(formatDate(user.dob));
    sloganRef.current.setValue(user.slogan);
    addressRef.current.setValue(user.address);
    genderRef.current.setValue(user.gender);
  }, [user]);

  useEffect(() => {
    if (isUpdate === null) return;

    if (!isUpdate) {
      dispatch(
        updateUser({
          ...user,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          birthday: dobRef.current.value,
          biography: sloganRef.current.value,
          address: addressRef.current.value,
          gender: genderRef.current.value,
        }),
      );
    } else {
      firstNameRef.current.focus();
    }
  }, [isUpdate]);

  function toggleUpdateHandler() {
    const isValid = firstNameRef.current.isValid && lastNameRef.current.isValid;
    if (!isValid) return;

    setIsUpdate((prevState) => !prevState);
  }

  const colorIcon = 'text-slate-400';
  return (
    <>
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
          validateFunction={validateEmpty}
          errorText="First name must not empty!"
        />
        <InputInformation
          ref={lastNameRef}
          readOnly={!isUpdate}
          title="Last name"
          icon={<UilUser className={colorIcon} />}
          validateFunction={validateEmpty}
          errorText="Last name must not empty!"
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
    </>
  );
};

export default BasicInformation;
