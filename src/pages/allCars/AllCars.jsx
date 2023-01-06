import React, { useState, useContext } from 'react';
import styles from './AllCars.module.scss';
import { GET_BRANDS } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import CarRow from './CarRow';
import AuthContext from '../../context/auth/authContext';

const AllCars = () => {
  const [brands, setBrands] = useState();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { loading, error, data } = useQuery(GET_BRANDS, {
    onCompleted: (data) => {
      setBrands(data.brands);
    }
  });
  if (loading)
    return (
      <div className={styles.error__message}>
        <p>Loading...</p>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null) {
      return (
        <div className={styles.error__message}>
          <p>You need to be log in to see this page</p>
        </div>
      );
    }
    return (
      <div className={styles.error__message}>
        <p>Something went wrong...</p>
      </div>
    );
  }

  return (
    <>
      {data && brands && user && !(user.role === 'ADMIN' || user.role === 'SUPERVISOR') ? (
        <div className={styles.error__message}>
          <h4>You need to be higher rank to perform this action</h4>
        </div>
      ) : (
        <>
          {data &&
            brands &&
            brands.length > 0 &&
            brands.map(
              (brand) =>
                brand.cars.length > 0 && (
                  <div className={styles.left__space}>
                    <div className={styles.rentals__wrapper}>
                      <div key={brand.id} className={styles.brand__item}>
                        <h1>{brand.name}</h1>
                        <table>
                          <thead>
                            <tr>
                              <th>Picture</th>
                              <th>Car</th>
                              <th>ID</th>
                              <th>Status</th>
                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {brand.cars.length > 0 &&
                              brand.cars.map((car) => <CarRow key={car.id} car={car} />)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )
            )}
        </>
      )}
    </>
  );
};

export default AllCars;
