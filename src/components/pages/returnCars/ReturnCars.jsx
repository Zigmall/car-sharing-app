import { useQuery } from '@apollo/client';
import React from 'react';
import styles from './ReturnCars.module.scss';
import Car from '../../car/Car';
import { GET_ALL_BORROWED_CARS } from '../../../queries/queries';
import { useParams } from 'react-router-dom';

const ReturnCars = () => {
  const userId = useParams().userId;
  const { data } = useQuery(GET_ALL_BORROWED_CARS, {
    variables: {
      userId: userId
    }
  });

  // let info = null;
  // const setInfo = (data) => {
  //   if (data.currentUser === null) {
  //     info = 'You need to be logged in.';
  //   } else if (data.currentUser.borrowedCarCopies.length === 0) {
  //     info = 'You have no cars to return.';
  //   }
  // };

  return (
    <div className={styles.returnCarWrapper}>
      {data && data.user.borrowedCarCopies.length > 0 ? (
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
      ) : (
        <div className={styles.noCars}>You have no cars to return.</div>
      )}
    </div>
  );
};

export default ReturnCars;
