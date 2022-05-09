import React, { useContext } from 'react';
import Car from '../car/Car';
import styles from './List.module.scss';
import PropTypes from 'prop-types';
import BottomNavigation from './bottomNavigation/BottomNavigation';
import CarContext from '../../context/car/carContext';

const List = (props) => {
  const carContext = useContext(CarContext);
  const { cars } = carContext;
  return (
    <div className={styles.wrapper}>
      {cars.map((car, index) => (
        <Car
          key={index}
          carClass={car.carClass}
          benefits={car.benefits}
          brand={car.brand}
          property={car.property}
          location={car.location}
          price={car.price}
          {...props}
        />
      ))}
      <BottomNavigation {...props} />
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array
};

export default List;
