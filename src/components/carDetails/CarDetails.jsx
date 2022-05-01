import React from 'react';

const CarDetails = () => {
  return (
    <div className={styles.carDetailsWrapper}>
      <div className={styles.topPicture}></div>
      <div className={styles.bottomWrapper}>
        <div className={styles.leftColumn}></div>
        <div className={styles.rightColumn}></div>
      </div>
    </div>
  );
};

export default CarDetails;
