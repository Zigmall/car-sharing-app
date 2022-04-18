import React from 'react';
import styles from './CarGroup.module.scss';
import InfoIcon from './InfoIcon';
import PropTypes from 'prop-types';
import MiddleIcon from './MiddleIcon';

const CarGroupElement = ({ model, active, luggage, passengers, price, onClickItem }) => {
  return (
    <div onClick={onClickItem} className={styles.wrapper}>
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
        <p>From {price}zł/day</p>
      </div>
      <div className={active ? styles.activeIndicator : undefined}></div>
    </div>
  );
};

CarGroupElement.propTypes = {
  model: PropTypes.string,
  active: PropTypes.bool,
  luggage: PropTypes.number,
  passengers: PropTypes.number,
  price: PropTypes.number,
  onClickItem: PropTypes.func
};

export default CarGroupElement;
