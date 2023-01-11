import React, { useState, useContext } from 'react';
import GroupElement from './GroupElement';
import styles from './TypeNavigationBar.module.scss';
import CarContext from '../../context/car/carContext';

const TypeNavigationBar = () => {
  const carContext = useContext(CarContext);
  const { filterCars } = carContext;
  const groupArray = [
    { carClass: 'All cars', price: 30 }, //TODO: price should be dynamic
    { carClass: 'Small', price: 30 },
    { carClass: 'Regular', price: 35 },
    { carClass: 'SUV', price: 45 },
    { carClass: 'Sport', price: 55 },
    { carClass: 'Estate', price: 35 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickItem = (index) => {
    setCurrentIndex(index);
    const currentCarClass = groupArray[index].carClass;
    filterCars(currentCarClass);
  };

  return (
    <div className={styles.carGroupWrapper}>
      {groupArray.map((element, index) => {
        return (
          <GroupElement
            key={index}
            carClass={element.carClass}
            active={index === currentIndex}
            price={element.price}
            onClickItem={() => onClickItem(index)}
          />
        );
      })}
    </div>
  );
};

export default TypeNavigationBar;
