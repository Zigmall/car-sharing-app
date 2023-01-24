import React from 'react';
import styles from './TypeNavigationBar.module.scss';
import PropTypes from 'prop-types';
import MiddleIcon from './MiddleIcon';

const GroupElement = ({ carClass, active, price, onClickItem }) => {
  return (
    <div onClick={onClickItem} className={styles.wrapper}>
      <div className={styles.header}>
        <p>{carClass}</p>
      </div>
      <div className={styles.carIcon}>
        <MiddleIcon carClass={carClass} />
      </div>

      <div className={styles.price}>
        <p>From €{price}/day</p>
      </div>
      <div className={active ? styles.activeIndicator : undefined}></div>
    </div>
  );
};

GroupElement.propTypes = {
  carClass: PropTypes.string,
  active: PropTypes.bool,
  luggage: PropTypes.number,
  passengers: PropTypes.number,
  price: PropTypes.number,
  onClickItem: PropTypes.func
};

export default GroupElement;
