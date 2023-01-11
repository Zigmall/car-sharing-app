import React from 'react';
import { GearBox, HumanIcon, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
import PropTypes from 'prop-types';
import styles from './SvgIconBar.module.scss';

const SvgIconBar = (props) => {
  return (
    <div className={styles.svgIconBar}>
      <HumanIcon {...props} />
      <label>{`${props.seats} Seats`}</label>
      <OpenDoorCar {...props} />
      <label>{`${props.doors} Doors`}</label>
      <Luggage {...props} />
      <label>{`${props.bags} L.`}</label>
      <AirConditioner {...props} />
      <label>{props.airConditioning ? '' : 'No'} Air Conditioning</label>
      <GearBox {...props} />
      <label>{props.manualGearBox ? 'Manual' : 'Automat'}</label>
    </div>
  );
};

SvgIconBar.propTypes = {
  seats: PropTypes.string,
  doors: PropTypes.string,
  bags: PropTypes.string,
  airConditioning: PropTypes.bool,
  manualGearBox: PropTypes.bool
};

export default SvgIconBar;
