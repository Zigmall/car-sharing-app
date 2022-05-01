import React from 'react';
import BenefitList from './BenefitList';
import styles from './Car.module.scss';
import PropTypes from 'prop-types';
import MiddleIcon from '../groupElement/MiddleIcon';
import SvgIconBar from '../svgIconBar/SvgIconBar';
import { GasStation, GpsDirection } from '../assets/SvgList';

const Car = ({ viewElement, carClass, benefits }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPart}>
        <div className={styles.pictureSide}>
          <MiddleIcon model={'Regular'} />{' '}
          {/* TODO  Needs to be changed to car photo when DB connected */}
        </div>
        <div className={styles.iconSide}>
          <div className={styles.carTypeAndName}>
            <label>{carClass}</label>
            <p>Ford Mustang</p>
          </div>
          <div className={styles.iconsLine}>
            <SvgIconBar
              iconHeight={'25'}
              iconWidth={'25'}
              seats={5}
              doors={5}
              bags={4}
              airConditioning={true}
              manualGearBox={true}
            />
          </div>
        </div>
      </div>
      <hr></hr>
      <div className={styles.bottomPart}>
        <div className={styles.columnOne}>
          <div className={styles.columnOneTop}>
            <GasStation iconHeight="30px" iconWidth="30px" />
            <div className={styles.columnOneText}>
              <p>Fuel policy</p>
              <label>Full to full</label>
            </div>
          </div>
          <div className={styles.columnOneBottom}>
            <GpsDirection iconHeight="30px" iconWidth="30px" />
            <div className={styles.columnOneText}>
              <p>Pick-up location</p>
              <label>location</label>
            </div>
          </div>
        </div>
        <div className={styles.columnTwo}>
          <BenefitList benefits={benefits} />
        </div>
        <div className={styles.columnThree}>
          <div className={styles.price}>
            <label>€ 114</label>
            <button onClick={viewElement}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Car.propTypes = {
  viewElement: PropTypes.func,
  carClass: PropTypes.string,
  benefits: PropTypes.array
};

export default Car;
