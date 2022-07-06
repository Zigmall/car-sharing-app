import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styles from './ReturnCars.module.scss';
import Car from '../../car/Car';

const GET_ALL_BORROWED_CARS = gql`
  query {
    currentUser {
      id
      lastName
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
  const { data } = useQuery(GET_ALL_BORROWED_CARS);
  let info = null;
  const setInfo = (data) => {
    if (data.currentUser === null) {
      info = 'You need to be logged in.';
    } else if (data.currentUser.borrowedCarCopies.length === 0) {
      info = 'You have no cars to return.';
    }
  };
  data && setInfo(data);

  return (
    <div className={styles.returnCarWrapper}>
      {data && info ? (
        <div className={styles.noCars}>
          <h1>{info}</h1>
        </div>
      ) : (
        data &&
        data.currentUser.borrowedCarCopies.map((car, index) => (
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
