import React, { useContext, useEffect } from 'react';
import TopBar from '../topBar/TopBar';
import SideBar from '../sideBar/SideBar';
import CarContext from '../../context/car/carContext';
import { useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { ALL_CARS, GET_CURRENT_USER } from '../../queries/queries';
import { useApolloClient } from '@apollo/client';
import { useLocation } from 'react-router-dom';

const Bars = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user, loadUser, logout, getTokenInfo, token } = authContext;
  const { data } = useQuery(ALL_CARS);
  const client = useApolloClient();

  const carContext = useContext(CarContext);
  const { getCars, divideCarsIntoPages, cars, navIndex, changeTab } = carContext;

  const onLogout = () => {
    logout();
    client.resetStore();
    changeTab(1);
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
        changeTab(1);
      }
    }, 15000);

    setSideBarIndex();

    return () => {
      clearInterval(intervalId);
    };
  }, [cars, data, setInterval]);

  const setColorOnSideBarIcon = (index) => {
    changeTab(index);
  };

  const setSideBarIndex = () => {
    if (window.location.pathname === '/') {
      if (navIndex !== 1) {
        changeTab(1);
      }
    } else if (window.location.pathname.includes('/user-settings')) {
      if (navIndex !== 2) {
        changeTab(2);
      }
    } else if (window.location.pathname.includes('my-bookings')) {
      if (navIndex !== 3) {
        changeTab(3);
      }
    } else if (window.location.pathname.includes('bookings')) {
      if (navIndex !== 3) {
        changeTab(3);
      }
    } else if (window.location.pathname.includes('/my-rents')) {
      if (navIndex !== 4) {
        changeTab(4);
      }
    } else if (window.location.pathname.includes('/rents')) {
      if (navIndex !== 4) {
        changeTab(4);
      }
    } else if (window.location.pathname.includes('/add-car')) {
      if (navIndex !== 5) {
        changeTab(5);
      }
    } else if (window.location.pathname.includes('/users')) {
      if (navIndex !== 2) {
        changeTab(2);
      }
    } else if (window.location.pathname.includes('/all-cars')) {
      if (navIndex !== 6) {
        changeTab(6);
      }
    }
  };

  return (
    <>
      {useLocation().pathname === '/login' || useLocation().pathname === '/registration' ? null : (
        <>
          <TopBar user={user} onLogout={onLogout} />
          <SideBar sideBarIndex={navIndex} setColorOnSideBarIcon={setColorOnSideBarIcon} />
        </>
      )}
    </>
  );
};

export default Bars;
