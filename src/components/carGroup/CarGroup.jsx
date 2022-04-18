import React from 'react';
import styles from './CarGroup.module.scss';
import InfoIcon from './InfoIcon';
import PropTypes from 'prop-types';
import MiddleIcon from './MiddleIcon';

const CarGroup = ({ model, active, luggage, passengers }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>{model}</p>
      </div>
      <div className={styles.iconsGroup}>
        <InfoIcon icon="passengers" />
        <p>{passengers}</p>
        <InfoIcon icon="luggage" />
        <p>{luggage}</p>
      </div>
      <div className={styles.carIcon}>
        <MiddleIcon model={model} />
      </div>
      <div className={styles.price}>
        <p>From 150zł/day</p>
      </div>
      <div className={active ? styles.activeIndicator : undefined}></div>
    </div>
  );
};

CarGroup.propTypes = {
  model: PropTypes.string,
  active: PropTypes.bool,
  luggage: PropTypes.number,
  passengers: PropTypes.number
};

export default CarGroup;
