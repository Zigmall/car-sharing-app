import React from 'react';
import BenefitList from './BenefitList';
import styles from './ListItem.module.scss';
import PropTypes from 'prop-types';
import MiddleIcon from '../../groupElement/MiddleIcon';

const benefits = ['Unlimited millage', 'Colision damage viewer', 'Theft protection'];

const ListItem = ({ viewElement, carClass }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPart}>
        <div className={styles.pictureSide}>
          <MiddleIcon model={'Regular'} />{' '}
          {/*   Needs to be changed to car photo when DB connected */}
        </div>
        <div className={styles.iconSide}>
          <div className={styles.carTypeAndName}>
            <label>{carClass}</label>
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
        <div className={styles.columnOne}>
          <div className={styles.columnOneTop}>
            <div>PetrolPumpIcon</div>
            <div>
              <p>Fuel policy</p>
              <label>Full to full</label>
            </div>
          </div>
          <div className={styles.columnOneBottom}>
            <div>LocationIcon</div>
            <div>
              <p>Pick-up location</p>
              <label>location</label>
            </div>
          </div>
        </div>
        <div className={styles.columnTwo}>
          <BenefitList benefits={benefits} />
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
  viewElement: PropTypes.func,
  carClass: PropTypes.string
};

export default ListItem;
