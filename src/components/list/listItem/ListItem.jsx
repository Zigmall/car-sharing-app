import React from 'react';
import BenefitList from './BenefitList';
import styles from './ListItem.module.scss';
import PropTypes from 'prop-types';

const ListItem = ({ viewElement }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPart}>
        <div className={styles.pictureSide}>picture</div>
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
      <div className={styles.bottomPart}>
        <div className={styles.columnOne}></div>
        <div className={styles.columnTwo}>
          <BenefitList />
        </div>
        <div className={styles.columnThree}>
          <label>€ 114</label>
          <button onClick={viewElement}>View</button>
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  viewElement: PropTypes.func
};

export default ListItem;
