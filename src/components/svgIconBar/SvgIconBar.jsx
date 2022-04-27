import React from 'react';
import { GearBox, HumanIcon, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
import PropTypes from 'prop-types';

const SvgIconBar = ({ seats, props }) => {
  return (
    <div>
      <OpenDoorCar {...props} />
      <label>{`${seats} seats`}</label>
      <HumanIcon {...props} />
      <Luggage {...props} />
      <GearBox {...props} />
      <AirConditioner {...props} />
    </div>
  );
};

SvgIconBar.propTypes = {
  seats: PropTypes.number
};

export default SvgIconBar;
