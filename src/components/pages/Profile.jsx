import React from 'react';
import ProfileAvatar from '../profile/profile-avatar/ProfileAvatar';
import ProfileInformation from '../profile/profile-information/ProfileInformation';

const Profile = () => {
  return (
    <div className="format-page-size flex py-5 gap-x-2">
      <ProfileAvatar />
      <ProfileInformation />
    </div>
  );
};

export default Profile;
