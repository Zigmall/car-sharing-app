import React from 'react';
import styles from './CarDetails.module.scss';
import MiddleIcon from '../groupElement/MiddleIcon';
import { GearBox, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
// import PropTypes from 'prop-types';

// { year, brand, property, location, price } TODO props for component

const CarDetails = (props) => {
  const data = {
    CarId: 123,
    carClass: 'Sport',
    benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
    brand: 'Ford Mustang',
    year: 2022,
    property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
    location: 'Warszawa',
    price: 50
  };

  const { year, brand, property, location, price } = data;

  return (
    <div className={styles.carDetailsWrapper}>
      <div className={styles.topPicture}>
        <MiddleIcon model={'Regular'} />
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.leftColumn}>
          <label>
            {brand} {year}
          </label>
          <p>Rating 5.0 *****</p>
          <div className={styles.firstLineOfIcons}>
            <OpenDoorCar {...props} />
            <label>{`${property.doors} doors`}</label>
            <Luggage {...props} />
            <label>{`${property.bags} bags`}</label>
          </div>
          <div className={styles.secondLineOfIcons}>
            <AirConditioner {...props} />
            <label>{property.airConditioning ? '' : 'No'} Air Conditioning</label>
            <GearBox {...props} />
            <label>{property.manualGearBox ? 'Manual' : 'Automat'}</label>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <p>€ {price}</p>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

// CarDetails.propTypes = {
//   carClass: PropTypes.string,
//   benefits: PropTypes.array,
//   brand: PropTypes.string,
//   property: PropTypes.array,
//   location: PropTypes.string,
//   price: PropTypes.string
// };

export default CarDetails;
