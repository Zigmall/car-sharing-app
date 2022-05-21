import React, { useContext } from 'react';
import List from '../../list/List';
import CarContext from '../../../context/car/carContext';

const Home = () => {
  const carContext = useContext(CarContext);
  const { currentView, currentIndex, changePage, numberOfPages } = carContext;

  const viewElement = () => {};

  return (
    <>
      {currentView && (
        <List
          data={currentView}
          viewElement={viewElement}
          currentIndex={currentIndex}
          numberOfPages={numberOfPages}
          changePage={changePage}
        />
      )}
    </>
  );
};

export default Home;
