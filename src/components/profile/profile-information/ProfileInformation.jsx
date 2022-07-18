import React from 'react';
import BasicInformation from './BasicInformation';
import ContactInformation from './ContactInformation';
import SecureInformation from './SecureInformation';

const ProfileInformation = () => {
  return (
    <section className="w-9/12 flex gap-x-2">
      <BasicInformation />
      <div className="w-1/2 flex flex-col gap-y-1">
        <div className="basis-5/12">
          <SecureInformation />
        </div>
        <div className="basis-7/12">
          <ContactInformation />
        </div>
      </div>
    </section>
  );
};

export default ProfileInformation;
