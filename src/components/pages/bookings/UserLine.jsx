import React from 'react';
import style from './Bookings.module.scss';
import PropTypes from 'prop-types';
// import { GET_ALL_USERS } from '../../queries/queries';
// import { DELETE_USER } from '../../mutations/mutations';
// import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const UserLine = ({ booking: { id, booker, startDate, endDate, car } }) => {
  const navigate = useNavigate();
  const handleRent = () => {
    navigate(`/bookings/${id}`);
  };

  const cancelBooking = () => {
    console.log('cancel booking');
  };

  return (
    <>
      <tr>
        <td>{`${booker.firstName} ${booker.lastName}`}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{`${car.brand.name} ${car.model}`}</td>
        <td>
          <button
            onClick={() => handleRent()}
            className={[style.button__wrapper, style.button__rent].join(' ')}>
            Proceed Rent
          </button>
        </td>
        <td>
          <button
            onClick={() => cancelBooking()}
            className={[style.button__wrapper, style.button__cancelBooking].join(' ')}>
            Cancel Booking
          </button>
        </td>
      </tr>
    </>
  );
};

UserLine.propTypes = {
  booking: PropTypes.object.isRequired,
  booker: PropTypes.object.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  car: PropTypes.object.isRequired
};

export default UserLine;
