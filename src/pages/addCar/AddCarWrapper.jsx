import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BRANDS, GET_CAR_CLASSES, GET_LOCATIONS } from '../../queries/queries';
import styles from './AddCar.module.scss';
import AddCar from './AddCar';

const AddCarWrapper = () => {
  const [brands, setBrands] = useState([]);
  const [classes, setClasses] = useState([]);
  const [locations, setLocations] = useState([]);

  const brandsList = useQuery(GET_BRANDS, {
    onCompleted: (data) => {
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
      {brands && classes && locations && (
        <div className={styles.editCar__wrapper}>
          <AddCar brands={brands} classes={classes} locations={locations} />
        </div>
      )}
    </>
  );
};

export default AddCarWrapper;
