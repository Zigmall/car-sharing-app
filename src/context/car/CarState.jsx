import React, { useReducer } from 'react';
import CarContext from './carContext';
import carReducer from './carReducer';
import PropTypes from 'prop-types';

import { GET_CARS, DIVIDE_CAR_LIST, CHANGE_PAGE, CHANGE_TAB } from '../types';

const CarState = (props) => {
  const initialState = {
    cars: null,
    currentIndex: 1,
    numberOfPages: 1,
    tableOfPages: [],
    currentView: null,
    filtered: null,
    loading: true,
    navIndex: 1
  };

  const [state, dispatch] = useReducer(carReducer, initialState);

  const getCars = (cars) => {
    dispatch({
      type: GET_CARS,
      payload: cars.data.cars
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

  const changeTab = (index) => {
    dispatch({
      type: CHANGE_TAB,
      payload: index
    });
  };

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
        navIndex: state.navIndex,
        getCars,
        divideCarsIntoPages,
        changePage,
        changeTab
      }}>
      {props.children}
    </CarContext.Provider>
  );
};

CarState.propTypes = {
  children: PropTypes.any
};

export default CarState;
