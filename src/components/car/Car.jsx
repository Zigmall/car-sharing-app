import React from 'react';
import { useNavigate } from 'react-router-dom';
import BenefitList from './BenefitList';
import styles from './Car.module.scss';
import PropTypes from 'prop-types';
import MiddleIcon from '../groupElement/MiddleIcon';
import SvgIconBar from '../svgIconBar/SvgIconBar';
import { GasStation, GpsDirection } from '../assets/SvgList';

const Car = ({ carClass, benefits, brand, property, location, price, id }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPart}>
        <div className={styles.pictureSide}>
          <MiddleIcon model={'Regular'} />
          {/* TODO  Needs to be changed to car photo when DB connected */}
        </div>
        <div className={styles.iconSide}>
          <div className={styles.carTypeAndName}>
            <label>{carClass}</label>
            <p>
              {brand.name} {brand.model.name}
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
              <label>{location}</label>
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
  viewElement: PropTypes.func,
  carClass: PropTypes.string,
  benefits: PropTypes.array,
  brand: PropTypes.object,
  property: PropTypes.object,
  location: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string
};

export default Car;
