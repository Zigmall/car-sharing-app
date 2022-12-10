import React from 'react';
import style from './Bookings.module.scss';
import PropTypes from 'prop-types';
// import { GET_ALL_USERS } from '../../queries/queries';
// import { DELETE_USER } from '../../mutations/mutations';
// import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const UserLine = ({ user }) => {
  const navigate = useNavigate();
  const handleRent = () => {
    navigate(`/users/${user.id}`);
  };

  const cancelBooking = () => {
    console.log('cancel booking');
  };

  return (
    <>
      <tr>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
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
  user: PropTypes.object,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.string
};

export default UserLine;
