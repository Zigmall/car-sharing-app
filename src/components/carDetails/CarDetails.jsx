import React from 'react';
import styles from './CarDetails.module.scss';

const CarDetails = () => {
  return (
    <div className={styles.carDetailsWrapper}>
      <div className={styles.topPicture}></div>
      <div className={styles.bottomWrapper}>
        <div className={styles.leftColumn}>
          <p>Rating 5.0 *****</p>
        </div>
        <div className={styles.rightColumn}></div>
      </div>
    </div>
  );
};

export default CarDetails;
