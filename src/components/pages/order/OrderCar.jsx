import React, { useState } from 'react';
import styles from './OrderCar.module.scss';
import 'react-calendar/dist/Calendar.css';

const OrderCar = () => {
  // const [date, setDate] = useState(new Date());

  // const handleDateChange = (e) => setDate(e);

  return (
    <div className={styles.calendar__wrapper}>
      <p>Order car</p>
    </div>
  );
};

export default OrderCar;
