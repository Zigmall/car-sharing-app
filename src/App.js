import React, { useState } from 'react';
import Home from './components/pages/home/Home';
import { Route, Routes } from 'react-router';
import CarDetails from './components/carDetails/CarDetails';
import TopBar from './components/topBar/TopBar';
import { toast } from 'react-toastify';
import styles from './App.module.scss';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const onLogout = () => {
    setUserLoggedIn(false);
  };

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

  return (
    <div className={styles.app}>
      <TopBar userName="John Doe" onLogout={onLogout} userLoggedIn={userLoggedIn} notify={notify} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars/:carId" element={<CarDetails iconHeight={'25'} iconWidth={'25'} />} />
      </Routes>
    </div>
  );
};

export default App;
