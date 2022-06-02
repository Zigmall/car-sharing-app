import React from 'react';
import { useParams } from 'react-router';
import styles from './CarDetails.module.scss';
import MiddleIcon from '../groupElement/MiddleIcon';
import { GearBox, Luggage, OpenDoorCar, AirConditioner } from '../assets/SvgList';
import Rating from '../rating/Rating';
import { gql, useQuery } from '@apollo/client';
import ActionButtons from '../actionButton/ActionButtons';

const GET_CAR = gql`
  query GetCar($carId: ID!) {
    car(id: $carId) {
      id
      carClass
      benefits
      model
      brand {
        name
      }
      year
      property {
        seats
        doors
        trunk
        airConditioning
        manualGearBox
      }
      location
      price
      copies {
        id
        borrower {
          id
        }
      }
    }
  }
`;

const CarDetails = () => {
  const { carId } = useParams();
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { carId }
  });

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    console.log('error:', error.message);
    return <p>Could not load book...</p>;
  }
  const { car } = data;

  const availableCars = car.copies.filter((car) => car.borrower === null);
  let copyId = null;

  if (availableCars.length < 1 || availableCars === null) {
    console.log('Car temporary unavailable');
  } else {
    copyId = availableCars[0].id;
  }

  const sumOfAllPoints = 10;
  const numberOfVoters = 3;
  const overallRating = 3;
  const voted = true;

  const changeVoted = () => {};
  const changeNumberOfVoters = () => {};
  const changeOverallRating = () => {};
  const changeSumOfAllPoints = () => {};

  return !loading && !error ? (
    <div className={styles.carDetailsWrapper}>
      <div className={styles.topPicture}>
        <MiddleIcon model={'Regular'} />
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.leftColumn}>
          <label>
            {car.brand.name} {car.year}
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
                <OpenDoorCar iconHeight={'25'} iconWidth={'25'} />
                <label>{`${car.property.doors} doors`}</label>
              </div>
              <div className={styles.informationElement}>
                <Luggage iconHeight={'25'} iconWidth={'25'} />
                <label>{`${car.property.trunk} bags`}</label>
              </div>
            </div>
            <div className={styles.lineOfIcons}>
              <div className={styles.informationElement}>
                <GearBox iconHeight={'25'} iconWidth={'25'} />
                <label>{car.property.manualGearBox ? 'Manual' : 'Automat'}</label>
              </div>
              <div className={styles.informationElement}>
                <AirConditioner iconHeight={'25'} iconWidth={'25'} />
                <label>{car.property.airConditioning ? '' : 'No'} Air Conditioning</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <h2>
            {availableCars.length}/{car.copies.length} AVAILABLE
          </h2>
          <h3>Price €{car.price}</h3>
          <p>Location: {car.location}</p>
          {copyId && <ActionButtons carCopy={car} />}
        </div>
      </div>
    </div>
  ) : null;
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
