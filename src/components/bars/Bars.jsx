import React, { useState, useContext, useEffect } from 'react';
import TopBar from '../topBar/TopBar';
import SideBar from '../sideBar/SideBar';
import CarContext from '../../context/car/carContext';
import { gql, useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/authContext';
import { AVATAR_FRAGMENT } from '../fragments/Fragments';

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

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      firstName
      lastName
      avatar {
        ...avatarFields
      }
    }
  }
  ${AVATAR_FRAGMENT}
`;

const Bars = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, logout } = authContext;
  const { data } = useQuery(ALL_CARS);

  // data && console.log('data: ', data.cars);

  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [sideBarIndex, setSideBarIndex] = useState(1);

  const carContext = useContext(CarContext);
  const { getCars, divideCarsIntoPages, cars } = carContext;

  const onLogout = () => {
    // setUserLoggedIn(false);
    logout();
    client.resetStore();
  };
  const { loading, error, data: data3, client } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    data && getCars({ data });
    if (cars !== null) {
      divideCarsIntoPages(cars);
    }
    if (error) {
      console.log(error);
    }

    if (!loading) {
      data3;
    }
    !loading && !error && loadUser(data3);
  }, [cars, data]);

  // error && console.log(error);

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
      <TopBar user={user} onLogout={onLogout} />
      <SideBar sideBarIndex={sideBarIndex} setColorOnSideBarIcon={setColorOnSideBarIcon} />
    </>
  );
};

export default Bars;
