import React, { useState, useEffect } from 'react';
import List from './components/list/List';

const App = () => {
  const viewElement = () => {};
  const dataFromDB = [
    {
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    },
    {
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    },
    {
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    },
    {
      carClass: 'Sport',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Ford Mustang',
      year: 2022,
      property: { seats: 4, doors: 3, bags: 2, airConditioning: false, manualGearBox: false },
      location: 'Warszawa',
      price: 50
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Toyota Yaris',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 3, airConditioning: true, manualGearBox: true },
      location: 'Gdańsk',
      price: 40
    },
    {
      carClass: 'Economy',
      benefits: ['Unlimited millage', 'Colision damage viewer', 'Theft protection'],
      brand: 'Nissan Micra',
      year: 2021,
      property: { seats: 4, doors: 5, bags: 4, airConditioning: true, manualGearBox: false },
      location: 'Poznań',
      price: 35
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [tableOfPages, setTableOfPages] = useState(null);
  const [data, setData] = useState(dataFromDB);

  useEffect(() => {
    divideCarsIntoPages(dataFromDB);
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
    <div className="App">
      <>
        <List
          data={data}
          viewElement={viewElement}
          currentIndex={currentIndex}
          numberOfPages={numberOfPages}
          changePage={changePage}
        />
      </>
    </div>
  );
};

export default App;
