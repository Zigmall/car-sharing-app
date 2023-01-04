import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CAR, GET_BRANDS, GET_CAR_CLASSES, GET_LOCATIONS } from '../../queries/queries';
import styles from './EditCar.module.scss';
import AddCar from '../addCar/AddCar';

const EditCar = () => {
  const { carId } = useParams();
  const [brands, setBrands] = useState([]);
  const [classes, setClasses] = useState([]);
  const [locations, setLocations] = useState([]);
  const car = useQuery(GET_CAR, {
    variables: { carId }
  });

  const brandsList = useQuery(GET_BRANDS, {
    onCompleted: (data) => {
      console.log('data.brands', data.brands);
      setBrands(data.brands);
    }
  });
  const classesList = useQuery(GET_CAR_CLASSES, {
    onCompleted: (data) => {
      setClasses(data.carClasses);
    }
  });
  const locationList = useQuery(GET_LOCATIONS, {
    onCompleted: (data) => {
      setLocations(data.locations);
    }
  });

  const error = brandsList.error || classesList.error || locationList.error;
  const loading = brandsList.loading || classesList.loading || locationList.loading;

  if (loading)
    return (
      <div className={styles.error__message}>
        <p>Loading...</p>
      </div>
    );

  if (error) {
    console.log(error);
    return (
      <div className={styles.error__message}>
        <p>Something went wrong...</p>
      </div>
    );
  }

  return (
    <>
      {car?.data && brands && classes && locations && (
        <div className={styles.editCar__wrapper}>
          <AddCar car={car?.data?.car} brands={brands} classes={classes} locations={locations} />
        </div>
      )}
    </>
  );
};

export default EditCar;
