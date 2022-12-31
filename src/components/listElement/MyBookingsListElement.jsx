import React from 'react';
import styles from './ListElement.module.scss';
import PropTypes from 'prop-types';

const MyBookingsListElement = ({ booking }) => {
  const { car, startDate, endDate, insuranceType, totalPayment } = booking;
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  return (
    <>
      {booking && (
        <div className={styles.payment__summary}>
          <div className={styles.payment__summary__left}>
            <div className={styles.payment__summary__left__title}>
              <h3>{`${car.brand.name} ${car.model}`}</h3>
            </div>
            <div className={styles.payment__summary__left__car}>
              <div className={styles.payment__summary__left__car__image}>
                <img
                  src={
                    car.picturePath.url
                      ? car.picturePath.url
                      : 'https://via.placeholder.com/400X200'
                  }
                  alt="car"
                />
              </div>
              <div className={styles.payment__summary__left__car__info}>
                <p>{car.description}</p>
              </div>
            </div>
          </div>
          <div className={styles.payment__summary__right}>
            <div className={styles.payment__summary__right__info}>
              <div className={styles.payment__summary__right__info__left}>
                <p>Start Date:</p>
                <p>End Date:</p>
                <p>Price per day:</p>
                <p>Insurance type:</p>
                <p>
                  <strong>Total price:</strong>
                </p>
              </div>
              <div className={styles.payment__summary__right__info__right}>
                <p>{formattedDate(startDate)}</p>
                <p>{formattedDate(endDate)}</p>
                <p>€{car.price}</p>
                <p>{insuranceType}</p>
                <p>
                  <strong>€{totalPayment}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MyBookingsListElement.propTypes = {
  booking: PropTypes.object.isRequired
};

export default MyBookingsListElement;
