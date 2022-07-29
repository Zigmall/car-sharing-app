import React, { useState } from 'react';
import styles from './AddCar.module.scss';
import { GET_BRANDS } from '../../../queries/queries';
import { useQuery } from '@apollo/client';

const AddCar = () => {
  const [brad, setBrand] = useState('');
  const { loading, error, data } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>Something went wrong</p>
        </div>
      </div>
    );
  }
  const brands = data.brands;
  brands && console.log('brands', brands);

  return (
    <>
      {brands && (
        <div className={styles.left__space}>
          <div className={styles.car__wrapper}>
            <div className={styles.car__header}>
              <h1>Add Car</h1>
            </div>

            <div className={styles.brand__list}>
              <label className={styles.form__label}>Brand</label>
              <select
                className={styles.form__select}
                value={brad}
                onChange={(e) => setBrand(e.target.value)}>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.car__form}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCar;
