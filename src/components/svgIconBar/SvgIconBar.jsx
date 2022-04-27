import React from 'react';
import { GearBox, HumanIcon, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
import PropTypes from 'prop-types';
import styles from './SvgIconBar.module.scss';

const SvgIconBar = (props) => {
  return (
    <div className={styles.svgIconBar}>
      <HumanIcon {...props} />
      <label>{`${props.seats} seats`}</label>
      <OpenDoorCar {...props} />
      <label>{`${props.doors} doors`}</label>
      <Luggage {...props} />
      <label>{`${props.bags} bags`}</label>
      <AirConditioner {...props} />
      <label>{props.airConditioning ? '' : 'No'} Air Conditioning</label>
      <GearBox {...props} />
      <label>{props.manualGearBox ? 'Manual' : 'Automat'}</label>
    </div>
  );
};

SvgIconBar.propTypes = {
  seats: PropTypes.number,
  doors: PropTypes.number,
  bags: PropTypes.number,
  airConditioning: PropTypes.bool,
  manualGearBox: PropTypes.bool
};

export default SvgIconBar;
