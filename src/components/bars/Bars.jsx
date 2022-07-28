import React, { useState, useContext, useEffect } from 'react';
import TopBar from '../topBar/TopBar';
import SideBar from '../sideBar/SideBar';
import CarContext from '../../context/car/carContext';
import { useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { ALL_CARS, GET_CURRENT_USER } from '../../queries/queries';
import { useApolloClient } from '@apollo/client';

const Bars = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user, loadUser, logout, getTokenInfo, token } = authContext;
  const { data } = useQuery(ALL_CARS);
  const [sideBarIndex, setSideBarIndex] = useState(1);
  const client = useApolloClient();

  const carContext = useContext(CarContext);
  const { getCars, divideCarsIntoPages, cars } = carContext;

  const onLogout = () => {
    logout();
    client.resetStore();
    navigate('/');
  };

  useQuery(GET_CURRENT_USER, {
    onCompleted: (currentUser) => {
      loadUser(currentUser);
    }
  });

  useEffect(() => {
    data && getCars({ data });
    if (cars !== null) {
      divideCarsIntoPages(cars);
    }

    const intervalId = setInterval(() => {
      const tokenInfo = getTokenInfo(token);

      if (tokenInfo && tokenInfo.exp - Math.round(Date.now() / 1000) < 30) {
        console.log('logout');
        logout();
        navigate('/');
        setSideBarIndex(1);
      }
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [cars, data, setInterval]);

  // error && console.log(error);

  // const sortByRating = () => {};
  // const sortByPopularity = () => {};

  // const sortBy = (sortingType) => {
  //   switch (sortingType) {
  //     case 'Dashboard':
  //       resetList();
  //       break;
  //     case 'Highest rated':
  //       sortByRating();
  //       break;
  //     case 'Most popular':
  //       sortByPopularity();
  //       break;

  //     default:
  //       resetList();
  //       break;
  //   }
  // };

  // const resetList = () => {};

  const setColorOnSideBarIcon = (index) => {
    setSideBarIndex(index);
    // console.log(label);
    // sortBy(label);
  };

  return (
    <>
      <TopBar user={user} onLogout={onLogout} />
      <SideBar sideBarIndex={sideBarIndex} setColorOnSideBarIcon={setColorOnSideBarIcon} />
    </>
  );
};

export default Bars;
