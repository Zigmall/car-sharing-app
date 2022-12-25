import styles from './Rents.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RentLine = ({ rent: { id, renter, pickupDate, returnDate, car, booking } }) => {
  //   const { handleCancelBooking } = props;
  const navigate = useNavigate();

  const handleCheckAndReturn = () => {
    navigate(`/rents/${id}`);
  };
  const handleEdit = () => {
    navigate(`/rent-summary/${id}`);
  };

  const getCurrentBooking = () => {
    const currentBooking = booking.find(
      (b) => b.bookingChanges.newBookingId === null && b.bookingChanges.rentId !== null
    );
    return currentBooking;
  };
  const currentBooking = getCurrentBooking();
  const { startDate, endDate } = currentBooking;

  const transformDate = (date) => {
    if (!date) {
      return 'Not returned yet';
    }
    const result = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    return result;
  };

  return (
    <>
      {id && (
        <tr>
          <td>{`${renter.firstName} ${renter.lastName}`}</td>
          <td>{transformDate(startDate)}</td>
          <td>{transformDate(pickupDate)}</td>
          <td>{transformDate(endDate)}</td>
          <td>{transformDate(returnDate)}</td>
          <td>{`${car.brand.name} ${car.model}`}</td>
          <td>
            <button
              onClick={() => handleEdit()}
              className={[styles.button__wrapper, styles.button__update].join(' ')}>
              Update Details
            </button>
          </td>
          <td>
            <button
              onClick={() => handleCheckAndReturn()}
              className={[styles.button__wrapper, styles.button__return].join(' ')}>
              Return Car
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

RentLine.propTypes = {
  rent: PropTypes.object.isRequired
};

export default RentLine;
