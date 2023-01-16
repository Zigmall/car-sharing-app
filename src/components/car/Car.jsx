import React from 'react';
import { useNavigate } from 'react-router-dom';
import BenefitList from './BenefitList';
import styles from './Car.module.scss';
import PropTypes from 'prop-types';
import MainPicture from './MainPicture';
import SvgIconBar from '../svgIconBar/SvgIconBar';
import { GasStation, GpsDirection } from '../assets/SvgList';

const Car = ({ model, benefits, brand, property, picturePath, location, price, id }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPart}>
        <div className={styles.pictureSide}>
          <MainPicture picturePath={picturePath.url} />
        </div>
        <div className={styles.iconSide}>
          <div className={styles.carTypeAndName}>
            <p>
              {brand.name} {model}
            </p>
          </div>
          <div className={styles.iconsLine}>
            <SvgIconBar
              iconHeight={'25'}
              iconWidth={'25'}
              seats={property.seats}
              doors={property.doors}
              bags={property.trunk}
              airConditioning={property.airConditioning}
              manualGearBox={property.manualGearBox}
            />
          </div>
        </div>
      </div>
      <hr></hr>
      <div className={styles.bottomPart}>
        <div className={styles.columnOne}>
          <div className={styles.columnOneTop}>
            <GasStation iconHeight="25px" iconWidth="20px" />
            <div className={styles.columnOneText}>
              <p>Fuel policy</p>
              <label>Full to full</label>
            </div>
          </div>
          <div className={styles.columnOneBottom}>
            <GpsDirection iconHeight="30px" iconWidth="20px" />
            <div className={styles.columnOneText}>
              <p>Pick-up location</p>
              <label>{location.point}</label>
            </div>
          </div>
        </div>
        <div className={styles.columnTwo}>
          <BenefitList benefits={benefits} />
        </div>
        <div className={styles.columnThree}>
          <div className={styles.price}>
            <label>€ {price}/day</label>
            <button onClick={() => navigate(`/cars/${id}`)}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Car.propTypes = {
  carClass: PropTypes.string,
  benefits: PropTypes.array,
  picturePath: PropTypes.object,
  brand: PropTypes.object,
  property: PropTypes.object,
  location: PropTypes.object,
  price: PropTypes.number,
  id: PropTypes.string,
  model: PropTypes.string,
  car: PropTypes.object
};

export default Car;
