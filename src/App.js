import React from 'react';
import Home from './components/pages/home/Home';
import { Route, Routes } from 'react-router';
import CarDetails from './components/carDetails/CarDetails';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars/:carId" element={<CarDetails iconHeight={'25'} iconWidth={'25'} />} />
      </Routes>
    </div>
  );
};

export default App;
