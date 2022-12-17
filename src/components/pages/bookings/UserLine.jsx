import React from 'react';
import styles from './Bookings.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserLine = ({ booking: { id, booker, startDate, endDate, car } }) => {
  const navigate = useNavigate();
  const handleRent = () => {
    navigate(`/bookings/${id}`);
  };
  const handleEdit = () => {
    navigate(`/update-booking/${id}`);
  };

  const cancelBooking = () => {
    console.log('cancel booking');
  };
  const start = new Date(startDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const end = new Date(endDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  return (
    <>
      <tr>
        <td>{`${booker.firstName} ${booker.lastName}`}</td>
        <td>{start}</td>
        <td>{end}</td>
        <td>{`${car.brand.name} ${car.model}`}</td>
        <td>
          <button
            onClick={() => handleRent()}
            className={[styles.button__wrapper, styles.button__rent].join(' ')}>
            Proceed Rent
          </button>
        </td>
        <td>
          <button
            onClick={() => handleEdit()}
            className={[styles.button__wrapper, styles.button__update].join(' ')}>
            Update Booking
          </button>
        </td>
        <td>
          <button
            onClick={() => cancelBooking()}
            className={[styles.button__wrapper, styles.button__cancelBooking].join(' ')}>
            Cancel Booking
          </button>
        </td>
      </tr>
    </>
  );
};

UserLine.propTypes = {
  booking: PropTypes.object.isRequired
};

export default UserLine;
