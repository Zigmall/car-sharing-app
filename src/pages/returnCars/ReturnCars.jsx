import { useQuery } from '@apollo/client';
import React from 'react';
import styles from './ReturnCars.module.scss';
import Car from '../../components/car/Car';
import { GET_ALL_BORROWED_CARS } from '../../queries/queries';
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

  if (loading) {
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>loading...</p>
        </div>
      </div>
    );
  }
  if (error) {
    console.log('error:', error.message);
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>Something went wrong...</p>
        </div>
      </div>
    );
  }
  const currentlyBorrowedCars = data.user.borrowedCars.filter((car) => car.endDate === null);

  return (
    <>
      {data && (
        <div className={styles.returnCarWrapper}>
          {currentlyBorrowedCars && currentlyBorrowedCars.length > 0 ? (
            currentlyBorrowedCars.map((car, index) => (
              <Car
                key={index}
                id={car.car.id}
                carClass={car.car.carClass.name}
                benefits={car.car.benefits}
                model={car.car.model}
                picturePath={car.car.picturePath}
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
      )}
    </>
  );
};

export default ReturnCars;
