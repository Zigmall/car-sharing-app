import styles from './MyRents.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserRentListElement = ({
  rent: { id, pickupDate, returnDate, car, booking, depositReturned }
}) => {
  const navigate = useNavigate();

  const displayHandlingOverCard = (id) => {
    navigate(`/rents/handling-over-card/${id}`);
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
          <td>{transformDate(startDate)}</td>
          <td>{transformDate(pickupDate)}</td>
          <td>{transformDate(endDate)}</td>
          <td>{transformDate(returnDate)}</td>
          <td>{`${car.brand.name} ${car.model}`}</td>
          <td>
            <button
              onClick={() => displayHandlingOverCard(id)}
              className={[styles.button__wrapper, styles.button__update].join(' ')}>
              Handling Over Card
            </button>
          </td>
          <td>
            {!returnDate && (
              <p className={styles.button__returned}>
                <strong>Not Returned Yet</strong>
              </p>
            )}
            {returnDate &&
              (depositReturned ? (
                <p className={styles.button__completed}>
                  <strong>Completed </strong>
                </p>
              ) : (
                <p className={styles.button__returned}>
                  <strong>Returned </strong>
                </p>
              ))}
          </td>
        </tr>
      )}
    </>
  );
};

UserRentListElement.propTypes = {
  rent: PropTypes.object.isRequired
};

export default UserRentListElement;
