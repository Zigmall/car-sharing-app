import React, { useReducer } from 'react';
// import { uuid } from 'uuidv4';
import CarContext from './carContext';
import carReducer from './carReducer';
import PropTypes from 'prop-types';
// import {
//   ADD_CAR,
//   DELETE_CAR,
//   SET_CURRENT,
//   CLEAR_CURRENT,
//   UPDATE_CURRENT,
//   FILTER_CAR,
//   CLEAR_FILTER
// } from '../types';

const CarState = (props) => {
  const initialState = {
    cars: [
      {
        carClass: 'Sport',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Ford Mustang',
        year: 2022,
        property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
        location: 'Warszawa',
        price: 50
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Toyota Yaris',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
        location: 'Gdańsk',
        price: 40
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Nissan Micra',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
        location: 'Poznań',
        price: 35
      },
      {
        carClass: 'Sport',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Ford Mustang',
        year: 2022,
        property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
        location: 'Warszawa',
        price: 50
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Toyota Yaris',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
        location: 'Gdańsk',
        price: 40
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Nissan Micra',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
        location: 'Poznań',
        price: 35
      },
      {
        carClass: 'Sport',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Ford Mustang',
        year: 2022,
        property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
        location: 'Warszawa',
        price: 50
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Toyota Yaris',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
        location: 'Gdańsk',
        price: 40
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Nissan Micra',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
        location: 'Poznań',
        price: 35
      },
      {
        carClass: 'Sport',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Ford Mustang',
        year: 2022,
        property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
        location: 'Warszawa',
        price: 50
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Toyota Yaris',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
        location: 'Gdańsk',
        price: 40
      },
      {
        carClass: 'Economy',
        benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
        brand: 'Nissan Micra',
        year: 2021,
        property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
        location: 'Poznań',
        price: 35
      }
    ]
  };

  const [state, dispatch] = useReducer(carReducer, initialState);

  //Add Car

  //Delete Car

  //Set current car

  //Clear current car

  //Update current car

  //Filter cars

  //Clear filter

  return (
    <CarContext.Provider
      value={{
        cars: state.cars
      }}>
      {props.children}
    </CarContext.Provider>
  );
};

CarState.propTypes = {
  children: PropTypes.any
};

export default CarState;
