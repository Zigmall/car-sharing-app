import React from 'react';
import styles from './CarGroup.module.scss';
import InfoIcon from './InfoIcon';
import { FaCar } from 'react-icons/fa';
import { IoIosCar } from 'react-icons/io';
import { AiFillCar } from 'react-icons/ai';
import PropTypes from 'prop-types';

const CarGroup = ({ model, active }) => {
  let IconComponent = null;
  switch (model) {
    case 'Small':
      IconComponent = FaCar;
      break;
    case 'Sport':
      IconComponent = IoIosCar;
      break;
    case 'Suv':
      IconComponent = AiFillCar;
      break;
    default:
      IconComponent = FaCar;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>{model}</p>
      </div>
      <div className={styles.iconsGroup}>
        <InfoIcon icon="users" />
        <p>4</p>
        <InfoIcon icon="luggage" />
        <p>3</p>
      </div>
      <div className={styles.carIcon}>
        <p>
          <IconComponent />
        </p>
      </div>
      <div className={styles.price}>
        <p>From 150zł/day</p>
      </div>
      <div className={active && styles.activeIndicator}></div>
    </div>
  );
};

CarGroup.propTypes = {
  model: PropTypes.string,
  active: PropTypes.bool
};

export default CarGroup;
