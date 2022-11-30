import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import styles from './Book.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import EditUserForm from '../../editUserForm/EditUserForm';
import AuthContext from '../../../context/auth/authContext';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_CAR } from '../../../queries/queries';

const Book = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showEditUserForm, setShowEditUserForm] = useState(true);
  // const [showDatePicker, setShowDatePicker] = useState(false);

  const { carId } = useParams();
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { carId }
  });
  // const navigate = useNavigate();
  // const carContext = useContext(CarContext);
  // const { changeTab } = carContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  if (loading) {
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>loading...</p>
        </div>
      </div>
    );
  }
  if (error) {
    console.log('error:', error.message);
    return <p>Could not load car...</p>;
  }
  const { car } = data;

  const handleSummaryButton = () => {};

  const checkIfUserHasAllData = (completed) => {
    setShowEditUserForm(!completed);
  };

  return (
    <>
      {user && car && (
        <div className={styles.page__wrapper}>
          <div className={styles.userData__title}>
            <h1>Car booking</h1>
          </div>
          <div className={styles.userData__steps}>
            <h2>{`Step 1: Complete your personal data ${
              showEditUserForm ? 'INCOMPLETE' : 'COMPLETED'
            }`}</h2>
          </div>
          {showEditUserForm && (
            <div className={styles.userData__wrapper}>
              <EditUserForm
                user={user}
                completeForBooking={true}
                checkIfUserHasAllData={checkIfUserHasAllData}
              />
            </div>
          )}
          {!showEditUserForm && (
            <>
              <div className={styles.userData__steps}>
                <h2>{`Step 2: Pick start and end dates ${
                  startDate && endDate ? 'COMPLETED' : ''
                }`}</h2>
              </div>

              <div className={styles.datePicker__container}>
                <div className={styles.datePicker__container__left}>
                  <label>Start Date</label>

                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    isClearable
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
                    isClearable
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="d/M/yyyy - HH:mm"
                  />
                </div>
              </div>
            </>
          )}
          {!showEditUserForm && startDate && endDate && (
            <>
              <div className={styles.userData__steps}>
                <h2>Step 3: Confirm all data by pressing BOOK button</h2>
              </div>
              <div className={styles.summary__wrapper}>
                <button onClick={() => handleSummaryButton()} className={styles.summary__button}>
                  BOOK
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Book;
