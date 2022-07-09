import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputInformation, HeaderProfile } from '../profile-input/ProfileInput';
import { UilKeySkeleton } from '@iconscout/react-unicons';

const SecureInformation = () => {
  const [isUpdate, setIsUpdate] = useState(null);

  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  useEffect(() => {
    if (isUpdate === null) {
      return;
    }
    if (!isUpdate) {
      console.log('submit', {
        newPassword: newPasswordRef.current.value,
        oldPassword: oldPasswordRef.current.value,
      });
    } else {
      oldPasswordRef.current.focus();
    }
  }, [isUpdate]);

  function toggleUpdateHandler() {
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecureInformation;
