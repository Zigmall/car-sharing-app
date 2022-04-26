import React from 'react';
import { HumanIcon, OpenDoorCar } from '../assets/SvgList';

const SvgIcon = (props) => {
  return (
    <div>
      <OpenDoorCar {...props} />
      <HumanIcon {...props} />
    </div>
  );
};

export default SvgIcon;
