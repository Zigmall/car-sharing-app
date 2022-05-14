import React from 'react';
import Home from './components/pages/home/Home';
import { Route, Routes } from 'react-router';
import CarDetails from './components/carDetails/CarDetails';
import styles from './App.module.scss';
import CarState from './context/car/CarState';
import Bars from './components/bars/Bars';
import Registration from './components/auth/Registration';
import AlertState from './context/alert/AlertState';
import Alerts from './components/alerts/Alerts';

const App = () => {
  return (
    <CarState>
      <AlertState>
        <div className={styles.app}>
          <Alerts />
          <Bars />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/cars/:carId"
              element={<CarDetails iconHeight={'25'} iconWidth={'25'} />}
            />
          </Routes>
        </div>
      </AlertState>
    </CarState>
  );
};

export default App;
