import { useQuery } from '@apollo/client';
import React from 'react';
import styles from './ReturnCars.module.scss';
import Car from '../../car/Car';
import { GET_ALL_BORROWED_CARS } from '../../../queries/queries';
import { useParams } from 'react-router-dom';

const ReturnCars = () => {
  const userId = useParams().userId;
  if (!userId) {
    return (
      <div className={styles.noCars}>
        <p>You need to be logged in</p>
      </div>
    );
  }
  const { loading, error, data } = useQuery(GET_ALL_BORROWED_CARS, {
    variables: {
      userId: userId
    }
  });

  if (error) {
    console.log(error);
  }
  if (loading) {
    return <p className={styles.noCars}>Loading...</p>;
  }
  const currentlyBorrowedCars = data.user.borrowedCars.filter((car) => car.endDate === null);

  return (
    <div className={styles.returnCarWrapper}>
      {currentlyBorrowedCars && currentlyBorrowedCars.length > 0 ? (
        currentlyBorrowedCars.map((car, index) => (
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
            car={car}
            returnCar={true}
          />
        ))
      ) : (
        <div className={styles.noCars}>You have no cars to return.</div>
      )}
    </div>
  );
};

export default ReturnCars;
