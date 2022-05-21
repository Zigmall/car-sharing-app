import React, { useState } from 'react';
import styles from './CarDetails.module.scss';
import MiddleIcon from '../groupElement/MiddleIcon';
import { GearBox, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
import Rating from '../rating/Rating';
// import PropTypes from 'prop-types';

// { year, brand, property, location, price } TODO props for component
const CarDetails = (props) => {
  const [sumOfAllPoints, changeSumOfAllPoints] = useState(4);
  const [voted, changeVoted] = useState(false);
  const [numberOfVoters, changeNumberOfVoters] = useState(1);
  const [overallRating, changeOverallRating] = useState(4);

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

  const { year, brand, property, location, price, orderElement } = data;

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
          <Rating
            sumOfAllPoints={sumOfAllPoints}
            voted={voted}
            numberOfVoters={numberOfVoters}
            overallRating={overallRating}
            changeSumOfAllPoints={changeSumOfAllPoints}
            changeVoted={changeVoted}
            changeNumberOfVoters={changeNumberOfVoters}
            changeOverallRating={changeOverallRating}
          />
          <div className={styles.columns}>
            <div className={styles.lineOfIcons}>
              <div className={styles.informationElement}>
                <OpenDoorCar {...props} />
                <label>{`${property.doors} doors`}</label>
              </div>
              <div className={styles.informationElement}>
                <Luggage {...props} />
                <label>{`${property.bags} bags`}</label>
              </div>
            </div>
            <div className={styles.lineOfIcons}>
              <div className={styles.informationElement}>
                <GearBox {...props} />
                <label>{property.manualGearBox ? 'Manual' : 'Automat'}</label>
              </div>
              <div className={styles.informationElement}>
                <AirConditioner {...props} />
                <label>{property.airConditioning ? '' : 'No'} Air Conditioning</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <p>Price €{price}</p>
          <p>Location: {location}</p>
          <button onClick={orderElement}>Order</button>
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
