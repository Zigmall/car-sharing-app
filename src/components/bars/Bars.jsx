import React, { useState, useContext, useEffect } from 'react';
import TopBar from '../topBar/TopBar';
import SideBar from '../sideBar/SideBar';
import CarContext from '../../context/car/carContext';
import { gql, useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/authContext';
// import { AVATAR_FRAGMENT } from '../fragments/Fragments';
import { useNavigate } from 'react-router-dom';

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
      isAdmin
      avatar {
        color
      }
      borrowedCarCopies {
        id
        car {
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
          copies {
            id
            borrower {
              id
            }
          }
        }
      }
    }
  }
`;

const Bars = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user, loadUser, logout, getTokenInfo, token } = authContext;
  const { data } = useQuery(ALL_CARS);
  const [sideBarIndex, setSideBarIndex] = useState(1);

  const carContext = useContext(CarContext);
  const { getCars, divideCarsIntoPages, cars } = carContext;

  const onLogout = () => {
    logout();
    client.resetStore();
  };
  const { loading, error, data: data3, client } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    data && getCars({ data });
    if (cars !== null) {
      divideCarsIntoPages(cars);
    }
    !loading && !error && loadUser(data3);

    const intervalId = setInterval(() => {
      const tokenInfo = getTokenInfo(token);

      if (tokenInfo && tokenInfo.exp - Math.round(Date.now() / 1000) < 30) {
        console.log('logout');
        logout();
      }
    }, 15000);
    navigate('/');

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
