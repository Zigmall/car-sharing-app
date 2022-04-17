import React from 'react';
import styles from './CarGroup.module.scss';
import InfoIcon from './InfoIcon';

const CarGroup = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>Small cars</p>
      </div>
      <div className={styles.iconsGroup}>
        <InfoIcon icon="users" />
      </div>
      <div className={styles.carIcon}></div>
      <div className={styles.price}>
        <p>From 150zł/day</p>
      </div>
      <div className={styles.activeIndicator}></div>
    </div>
  );
};

export default CarGroup;
