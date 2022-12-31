import React, { useState, useContext, useEffect } from 'react';
import styles from './MyBookings.module.scss';
import MyBookingListElement from '../../components/listElement/MyBookingsListElement';
import { useQuery } from '@apollo/client';
import { BOOKED_CARS_BY_USER_ID } from '../../queries/queries';
import AuthContext from '../../context/auth/authContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { loading, error, data } = useQuery(BOOKED_CARS_BY_USER_ID);

  useEffect(() => {
    if (data) {
      setBookings(data);
    }
  }, [data]);

  if (loading)
    return (
      <div className={styles.error__message}>
        <p>Loading...</p>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null) {
      return (
        <div className={styles.error__message}>
          <p>You need to be log in to see this page</p>
        </div>
      );
    }
    return (
      <div className={styles.error__message}>
        <p>Something went wrong...</p>
      </div>
    );
  }
  data && console.log('bookings', bookings);
  return (
    <>
      {data && (
        <div className={styles.page__wrapper}>
          <h1>My Bookings</h1>
          {data.bookedCarsByUserId.map((booking) =>
            booking.bookingChanges.cancelled === null &&
            booking.bookingChanges.newBookingId === null ? (
              <MyBookingListElement key={booking.id} booking={booking} />
            ) : null
          )}
        </div>
      )}
    </>
  );
};

export default MyBookings;
