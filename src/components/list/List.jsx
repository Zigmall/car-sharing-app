import React from 'react';
import Car from '../car/Car';
import styles from './List.module.scss';
import PropTypes from 'prop-types';
import BottomNavigation from './bottomNavigation/BottomNavigation';

const List = ({ data, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {data.map((car, index) => (
        <Car
          key={index}
          viewElement={props}
          carClass={car.carClass}
          benefits={car.benefits}
          brand={car.brand}
          property={car.property}
          location={car.location}
          price={car.price}
        />
      ))}
      <BottomNavigation {...props} />
    </div>
  );
};

List.propTypes = {
  data: PropTypes.object
};

export default List;
