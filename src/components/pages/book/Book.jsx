import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './Book.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Book = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log('Time:', startDate);
  return (
    <>
      <div className={styles.page__wrapper}>
        <div className={styles.datePicker__container}>
          <div className={styles.datePicker__container__left}>
            <label>Start Date</label>

            <DatePicker
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="d/M/yyyy - HH:mm"
            />
          </div>
          <div className={styles.datePicker__container__right}>
            <label>End Date</label>
            <DatePicker
              showTimeSelect
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="d/M/yyyy - HH:mm"
            />
          </div>
        </div>
        <div className={styles.userData__wrapper}>
          <div className={styles.userData__container}></div>
        </div>
      </div>
    </>
  );
};

export default Book;
