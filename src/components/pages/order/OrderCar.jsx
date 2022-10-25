import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './OrderCar.module.scss';
import 'react-calendar/dist/Calendar.css';

const OrderCar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (e) => setDate(e);

  return (
    <div className={styles.calendar__wrapper}>
      <Calendar onChange={handleDateChange} value={date} />
      {console.log(date)}
    </div>
  );
};

export default OrderCar;
