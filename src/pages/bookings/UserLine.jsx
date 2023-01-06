import styles from './Bookings.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserLine = (props) => {
  const {
    booking: { id, booker, startDate, endDate, car }
  } = props;
  const { handleCancelBooking } = props;
  const navigate = useNavigate();

  const handleRent = () => {
    navigate(`/bookings/${id}`);
  };
  const handleEdit = () => {
    navigate(`/update-booking/${id}`);
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

  const isRentable = new Date(startDate).getTime() - new Date().getTime() < 1000 * 60 * 60 * 3;
  return (
    <>
      {id && (
        <tr>
          <td>{`${booker.firstName} ${booker.lastName}`}</td>
          <td>{start}</td>
          <td>{end}</td>
          <td>{`${car.brand.name} ${car.model}`}</td>
          <td>
            <button
              onClick={() => handleRent()}
              disabled={!isRentable}
              className={
                isRentable
                  ? [styles.button__wrapper, styles.button__rent].join(' ')
                  : [styles.button__inactive, styles.button__wrapper].join(' ')
              }>
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
              onClick={handleCancelBooking}
              className={[styles.button__wrapper, styles.button__cancelBooking].join(' ')}>
              Cancel Booking
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

UserLine.propTypes = {
  booking: PropTypes.object.isRequired,
  handleCancelBooking: PropTypes.func.isRequired
};

export default UserLine;
