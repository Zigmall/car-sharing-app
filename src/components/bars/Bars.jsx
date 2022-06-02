import React, { useState, useContext, useEffect } from 'react';
import TopBar from '../topBar/TopBar';
import SideBar from '../sideBar/SideBar';
import CarContext from '../../context/car/carContext';
import { gql, useQuery } from '@apollo/client';

const ALL_CARS = gql`
  query getCars {
    cars {
      id
      carClass
      benefits
      model
      brand {
        name
      }
      year
      property {
        seats
        doors
        trunk
        airConditioning
        manualGearBox
      }
      location
      price
    }
  }
`;

const Bars = () => {
  const { data } = useQuery(ALL_CARS);
  // data && console.log('data: ', data.cars);

  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [sideBarIndex, setSideBarIndex] = useState(1);

  const carContext = useContext(CarContext);
  const { getCars, divideCarsIntoPages, cars } = carContext;

  const onLogout = () => {
    setUserLoggedIn(false);
  };

  useEffect(() => {
    data && getCars({ data });
    if (cars !== null) {
      divideCarsIntoPages(cars);
    }
  }, [cars, data]);

  const sortByRating = () => {};
  const sortByPopularity = () => {};

  const sortBy = (sortingType) => {
    switch (sortingType) {
      case 'Dashboard':
        resetList();
        break;
      case 'Highest rated':
        sortByRating();
        break;
      case 'Most popular':
        sortByPopularity();
        break;

      default:
        resetList();
        break;
    }
  };

  const resetList = () => {};

  const setColorOnSideBarIcon = (index, label) => {
    setSideBarIndex(index);
    sortBy(label);
  };

  return (
    <>
      <TopBar userName="John Doe" onLogout={onLogout} userLoggedIn={userLoggedIn} />
      <SideBar sideBarIndex={sideBarIndex} setColorOnSideBarIcon={setColorOnSideBarIcon} />
    </>
  );
};

export default Bars;
