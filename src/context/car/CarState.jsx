import React, { useReducer } from 'react';
// import { uuid } from 'uuidv4';
import CarContext from './carContext';
import carReducer from './carReducer';
import PropTypes from 'prop-types';
import {
  GET_CARS,
  DIVIDE_CAR_LIST,
  CHANGE_PAGE
  //   ADD_CAR,
  //   DELETE_CAR,
  //   SET_CURRENT,
  //   CLEAR_CURRENT,
  //   UPDATE_CURRENT,
  //   FILTER_CAR,
  //   CLEAR_FILTER
} from '../types';

const CarState = (props) => {
  const initialState = {
    cars: null,
    currentIndex: 1,
    numberOfPages: 1,
    tableOfPages: [],
    currentView: null,
    filtered: null,
    loading: true
  };

  const [state, dispatch] = useReducer(carReducer, initialState);

  const getCars = () => {
    dispatch({
      type: GET_CARS,
      payload: dataFromDB.cars
    });
  };

  const divideCarsIntoPages = (cars) => {
    const copyOfDb = [...cars];
    const result = new Array(Math.ceil(copyOfDb.length / 10))
      .fill()
      .map(() => copyOfDb.splice(0, 10));
    dispatch({
      type: DIVIDE_CAR_LIST,
      payload: result
    });
  };

  const changePage = (index) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: index
    });
  };

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
        cars: state.cars,
        currentIndex: state.currentIndex,
        numberOfPages: state.numberOfPages,
        tableOfPages: state.tableOfPages,
        currentView: state.currentView,
        filtered: state.filtered,
        loading: state.loading,
        getCars,
        divideCarsIntoPages,
        changePage
      }}>
      {props.children}
    </CarContext.Provider>
  );
};

CarState.propTypes = {
  children: PropTypes.any
};

export default CarState;

const dataFromDB = {
  cars: [
    {
      id: 1,
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      id: 2,
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      id: 3,
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    },
    {
      id: 4,
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      id: 5,
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      id: 6,
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    },
    {
      id: 7,
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      id: 8,
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      id: 9,
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    },
    {
      id: 10,
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      id: 11,
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      id: 12,
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
