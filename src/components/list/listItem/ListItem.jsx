import React from 'react';
import styles from './ListItem.module.scss';

const ListItem = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPart}>
        <div className={styles.pictureSide}></div>
        <div className={styles.iconSide}>
          <div className={styles.carTypeAndName}>
            <label>Economy</label>
            <p>Ford Mustang</p>
          </div>
          <div className={styles.iconsLine}>
            <p> ICON </p>
            <p>5 seat </p>
            <p> ICON </p>
            <p>3 dors</p>
            <p> ICON </p>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className={styles.bottomPart}></div>

      <p>List item</p>
    </div>
  );
};

export default ListItem;
