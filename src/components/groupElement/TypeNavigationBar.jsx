import React, { useState } from 'react';
import GroupElement from './GroupElement';
import styles from './TypeNavigationBar.module.scss';

const TypeNavigationBar = () => {
  const groupArray = [
    { model: 'Small', luggage: 2, passengers: 4, price: 30 }, //TODO
    { model: 'Regular', luggage: 3, passengers: 4, price: 35 },
    { model: 'Suv', luggage: 4, passengers: 5, price: 45 },
    { model: 'Sport', luggage: 2, passengers: 4, price: 55 },
    { model: 'Estate', luggage: 6, passengers: 5, price: 35 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickItem = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carGroupWrapper}>
      {groupArray.map((element, index) => {
        return (
          <GroupElement
            key={index}
            model={element.model}
            active={index === currentIndex}
            luggage={element.luggage}
            passengers={element.passengers}
            price={element.price}
            onClickItem={() => onClickItem(index)}
          />
        );
      })}
    </div>
  );
};

export default TypeNavigationBar;
