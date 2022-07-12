import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputInformation, HeaderProfile } from '../profile-input/ProfileInput';
import { UilKeySkeleton } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, getUser } from '../../../store/selectors';
import { updateUser } from '../../../store/authen-slice';

const SecureInformation = ({ toastRef }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(null);

  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  useEffect(() => {
    // ignore the first time component mount
    if (isUpdate === null) {
      return;
    }
    if (!isUpdate) {
      dispatch(
        updateUser({
          ...user,
          currentPassword: oldPasswordRef.current.value,
          password: newPasswordRef.current.value,
        }),
      );
      oldPasswordRef.current.reset();
    } else {
      oldPasswordRef.current.focus();
    }
  }, [isUpdate]);

  function toggleUpdateHandler() {
    if (newPasswordRef.current) {
      const isValid = newPasswordRef.current.isValid;
      if (!isValid) return;
      if (newPasswordRef.current.value === oldPasswordRef.current.value) {
        toastRef.current.addToast({
          type: 'error',
          message: 'New password must not duplicate!',
        });
        return;
      }
    }

    setIsUpdate((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col items-center gap-y-2 text-primary">
      <HeaderProfile
        title="Secure Information"
        onToggleUpdate={toggleUpdateHandler}
        isUpdate={isUpdate}
      />
      <InputInformation
        readOnly={!isUpdate}
        ref={oldPasswordRef}
        title="Password"
        placeholder=""
        icon={<UilKeySkeleton className=" text-slate-400" size="20" />}
        type="password"
      />
      <AnimatePresence>
        {isUpdate && (
          <motion.div
            className="w-full flex justify-center"
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              stiffness: 100,
              type: 'spring',
              damping: 8,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
          >
            <InputInformation
              ref={newPasswordRef}
              title="New Password"
              placeholder=""
              icon={<UilKeySkeleton className=" text-slate-400" size="20" />}
              type="password"
              validateFunction={(value) => value.trim().length >= 8}
              errorText="Password least 8 characters!"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecureInformation;
