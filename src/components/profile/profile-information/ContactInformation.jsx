import React from 'react';
import { HeaderProfile, InputInformation } from '../profile-input/ProfileInput';
import { UilEnvelopeAlt, UilPhone } from '@iconscout/react-unicons';

const ContactInformation = () => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <HeaderProfile title="Contact Information" />
      <InputInformation
        title="Email"
        type="email"
        icon={<UilEnvelopeAlt size="20" className="text-slate-400" />}
      />
      <InputInformation
        title="Phone"
        type="number"
        icon={<UilPhone size="20" className="text-slate-400" />}
      />
    </div>
  );
};

export default ContactInformation;
