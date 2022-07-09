import React from 'react';
import BiographyItem from './BiographyItem';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const BiographyList = () => {
  const sx = { fontSize: 25 };
  return (
    <ul className="mt-6 w-full h-max">
      <BiographyItem
        icon={<CelebrationOutlinedIcon sx={sx} />}
        title="Birth day"
        description="13/09/2001"
      />
      <BiographyItem
        icon={<CreateOutlinedIcon sx={sx} />}
        title="Slogan"
        description="Yolo!"
      />
      <BiographyItem
        icon={<CalendarMonthOutlinedIcon sx={sx} />}
        title="Join at"
        description="14/01/2010"
      />
    </ul>
  );
};

export default BiographyList;
