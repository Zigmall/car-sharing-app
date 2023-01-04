import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CAR } from '../../queries/queries';
import styles from './EditCar.module.scss';
import AddCar from '../addCar/AddCar';

const EditCar = () => {
  const { carId } = useParams();
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { carId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      {data && (
        <div className={styles.editCar__wrapper}>
          <AddCar car={data.car} />
        </div>
      )}
    </>
  );
};

export default EditCar;
