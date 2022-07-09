import React from 'react';
import { InputInformation, HeaderProfile } from '../profile-input/ProfileInput';
import { UilKeySkeleton } from '@iconscout/react-unicons';

const SecureInformation = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 text-primary">
      <HeaderProfile title="Secure Information" />
      <InputInformation
        title="Password"
        placeholder=""
        icon={<UilKeySkeleton className=" text-slate-400" size="20" />}
        type="password"
      />
    </div>
  );
};

export default SecureInformation;
