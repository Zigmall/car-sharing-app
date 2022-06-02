import React from 'react';
import styles from './TypeNavigationBar.module.scss';
import InfoIcon from './InfoIcon';
import PropTypes from 'prop-types';
import MiddleIcon from './MiddleIcon';

const GroupElement = ({ model, active, luggage, passengers, price, onClickItem }) => {
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
        <p>From €{price}/day</p>
      </div>
      <div className={active ? styles.activeIndicator : undefined}></div>
    </div>
  );
};

GroupElement.propTypes = {
  model: PropTypes.string,
  active: PropTypes.bool,
  luggage: PropTypes.number,
  passengers: PropTypes.number,
  price: PropTypes.number,
  onClickItem: PropTypes.func
};

export default GroupElement;
