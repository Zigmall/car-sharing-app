import React from 'react';
import CarGroupElement from './CarGroupElement';
import styles from './CarGroup.module.scss';
import PropTypes from 'prop-types';

const CarGroupWrapper = ({ currentIndex }) => {
  const groupArray = [
    { model: 'Small', luggage: 2, passengers: 4, price: 120 },
    { model: 'Regular', luggage: 3, passengers: 4, price: 130 },
    { model: 'Suv', luggage: 4, passengers: 5, price: 180 },
    { model: 'Sport', luggage: 2, passengers: 4, price: 230 },
    { model: 'Estate', luggage: 6, passengers: 5, price: 150 }
  ];

  return (
    <div className={styles.carGroupWrapper}>
      {groupArray.map((element, index) => {
        return (
          <CarGroupElement
            key={index}
            model={element.model}
            active={index + 1 === currentIndex}
            luggage={element.luggage}
            passengers={element.passengers}
            price={element.price}
          />
        );
      })}
    </div>
  );
};

CarGroupWrapper.propTypes = {
  currentIndex: PropTypes.number
};

export default CarGroupWrapper;
