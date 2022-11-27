import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './Book.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import EditUserForm from '../../editUserForm/EditUserForm';

const Book = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log('Time:', startDate);
  return (
    <>
      <div className={styles.page__wrapper}>
        <div className={styles.userData__title}>
          <h1>Car booking</h1>
        </div>
        <div className={styles.userData__steps}>
          <h2>Step 1: Complete your personal data</h2>
        </div>
        <div className={styles.userData__wrapper}>
          <EditUserForm completeForBooking={true} />
        </div>
        <div className={styles.userData__steps}>
          <h2>Step 2: Pick start and end dates</h2>
        </div>
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
        <div className={styles.userData__steps}>
          <h2>Step 3: Confirm all data by pressing BOOK button</h2>
        </div>
      </div>
    </>
  );
};

export default Book;
