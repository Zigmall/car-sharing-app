import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styles from './ReturnCars.module.scss';
import Car from '../../car/Car';

const GET_ALL_BORROWED_CARS = gql`
  query ($userId: ID!) {
    user(id: $userId) {
      borrowedCarCopies {
        id
        car {
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
    }
  }
`;

const ReturnCars = () => {
  const { data } = useQuery(GET_ALL_BORROWED_CARS, { variables: { userId: 'VXNlci0x' } });
  return (
    <div className={styles.returnCarWrapper}>
      {data && data.user.borrowedCarCopies.length < 1 ? (
        <div className={styles.noCars}>
          <h1>You have no cars to return</h1>
        </div>
      ) : (
        data &&
        data.user.borrowedCarCopies.map((car, index) => (
          <Car
            key={index}
            id={car.car.id}
            carClass={car.car.carClass}
            benefits={car.car.benefits}
            model={car.car.model}
            brand={car.car.brand}
            property={car.car.property}
            location={car.car.location}
            price={car.car.price}
            carCopy={car}
            returnCar={true}
          />
        ))
      )}
    </div>
  );
};

export default ReturnCars;
