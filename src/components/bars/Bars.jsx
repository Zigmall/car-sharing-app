import React, { useState, useContext, useEffect } from 'react';
import TopBar from '../topBar/TopBar';
import { toast } from 'react-toastify';
import SideBar from '../sideBar/SideBar';
import CarContext from '../../context/car/carContext';

const Bars = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [sideBarIndex, setSideBarIndex] = useState(1);

  const carContext = useContext(CarContext);
  const { getCars, divideCarsIntoPages, cars } = carContext;

  const onLogout = () => {
    setUserLoggedIn(false);
  };

  useEffect(() => {
    getCars();
    if (cars !== null) {
      divideCarsIntoPages(cars);
    }
  }, [cars]);

  const notify = () =>
    toast.success('You have been successfully logged out!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

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
      <TopBar userName="John Doe" onLogout={onLogout} userLoggedIn={userLoggedIn} notify={notify} />
      <SideBar sideBarIndex={sideBarIndex} setColorOnSideBarIcon={setColorOnSideBarIcon} />
    </>
  );
};

export default Bars;
