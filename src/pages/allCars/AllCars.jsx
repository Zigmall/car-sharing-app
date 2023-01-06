import React from 'react';
import styles from './AllCars.module.scss';
import { GET_BRANDS } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import CarRow from './CarRow';

const AllCars = () => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <>
      <div className={styles.left__space}>
        <div className={styles.rentals__wrapper}>
          {data &&
            data.brands.map((brand) => {
              return (
                <div key={brand.id} className={styles.brand__item}>
                  <h1>{brand.name}</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>Model</th>
                        <th>ID</th>
                        <th>Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brand.cars.length > 0 &&
                        brand.cars.map((car) => <CarRow key={car.id} car={car} />)}
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AllCars;
