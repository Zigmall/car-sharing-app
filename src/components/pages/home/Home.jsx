import React, { useState, useEffect, useContext } from 'react';
import List from '../../list/List';
import CarContext from '../../../context/car/carContext';

const Home = () => {
  const carContext = useContext(CarContext);
  const { cars } = carContext;
  const viewElement = () => {};

  const [currentIndex, setCurrentIndex] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [tableOfPages, setTableOfPages] = useState(null);
  const [data, setData] = useState(cars);

  useEffect(() => {
    divideCarsIntoPages(cars);
  }, []);

  const divideCarsIntoPages = (car) => {
    const copyOfDb = [...car];
    const result = new Array(Math.ceil(copyOfDb.length / 10))
      .fill()
      .map(() => copyOfDb.splice(0, 10));
    setTableOfPages(result);
    setNumberOfPages(result.length);
    setData(result[0]);
  };

  const changePage = (index) => {
    setCurrentIndex(index);
    setData(tableOfPages[index - 1]);
  };
  return (
    <>
      <List
        data={data}
        viewElement={viewElement}
        currentIndex={currentIndex}
        numberOfPages={numberOfPages}
        changePage={changePage}
      />
    </>
  );
};

export default Home;
