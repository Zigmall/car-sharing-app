import React, { useContext } from 'react';
import styles from './ReturnSummary.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import AuthContext from '../../../context/auth/authContext';
import { GET_RENT_BY_ID } from '../../../queries/queries';
// import { useMutation } from '@apollo/client';
// import { UPDATE_RENT } from '../../../mutations/mutations';
// import AlertContext from '../../../context/alert/alertContext';
// import { useNavigate } from 'react-router-dom';
const ReturnSummary = () => {
  const { rentId } = useParams();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  // const alertContext = useContext(AlertContext);
  // const { setAlert } = alertContext;
  // const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_RENT_BY_ID, {
    variables: { rentId }
  });

  if (user && user === null) {
    return (
      <div className={styles.page__wrapper}>
        <div className={styles.error__message}>
          <p>You are not authorized to perform this action</p>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className={styles.page__wrapper}>
        <div className={styles.error__message}>
          <p>Loading...</p>
        </div>
      </div>
    );
  if (error) {
    console.log('error: ', error);
    return (
      <div className={styles.page__wrapper}>
        <div className={styles.error__message}>
          <p>Something went wrong...</p>
        </div>
      </div>
    );
  }
  console.log('data: ', data);

  return (
    <div className={styles.rentSummary__wrapper}>
      <div className={styles.rentSummary__header}>
        <h1>Return Summary</h1>
      </div>
      <div className={styles.rentSummary__content}>
        <div className={styles.rentSummary__content__wrapper}>
          <div className={styles.rentSummary__content__left}>
            <div className={styles.rentSummary__content__left__header}>
              <h2>Car return</h2>
            </div>
            <div className={styles.rentSummary__content__left__body}>
              <div className={styles.rentSummary__content__left__body__item}>
                <p>Return Date 2021-01-01</p>
              </div>
              <div className={styles.rentSummary__content__left__body__item}>
                <p>Return Time 12:00</p>
              </div>
              <div className={styles.rentSummary__content__left__body__item}>
                <p>Return Location Location</p>
              </div>
            </div>
          </div>
          <div className={styles.rentSummary__content__left__body__item}>
            <button className={styles.rentSummary__content__button}>
              Check Handling Over Card
            </button>
          </div>
        </div>
        <div className={styles.rentSummary__content__wrapper}>
          <div className={styles.rentSummary__content__middle}>
            <div className={styles.rentSummary__content__middle__header}>
              <h2>Financial</h2>
            </div>
            <div className={styles.rentSummary__content__middle__body}>
              <div className={styles.rentSummary__content__middle__body__item}>
                <p>Return Date</p>
                <p>2021-01-01</p>
              </div>
              <div className={styles.rentSummary__content__middle__body__item}>
                <p>Return Time</p>
                <p>12:00</p>
              </div>
              <div className={styles.rentSummary__content__middle__body__item}>
                <p>Return Location</p>
                <p>Location</p>
              </div>
            </div>
          </div>
          <div className={styles.rentSummary__content__left__body__item}>
            <button className={styles.rentSummary__content__button}>All financial completed</button>
          </div>
        </div>
        <div className={styles.rentSummary__content__wrapper}>
          <div className={styles.rentSummary__content__right}>
            <div className={styles.rentSummary__content__right__header}>
              <h2>Confirmation and deposit</h2>
            </div>
            <div className={styles.rentSummary__content__right__body}>
              <div className={styles.rentSummary__content__right__body__item}>
                <p>Return Date</p>
                <p>2021-01-01</p>
              </div>
              <div className={styles.rentSummary__content__right__body__item}>
                <p>Return Time</p>
                <p>12:00</p>
              </div>
              <div className={styles.rentSummary__content__right__body__item}>
                <p>Return Location</p>
                <p>Location</p>
              </div>
            </div>
          </div>
          <div className={styles.rentSummary__content__left__body__item}>
            <button className={styles.rentSummary__content__button}>
              Complete and return deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnSummary;
