import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKINGS } from '../../queries/queries';
import AuthContext from '../../context/auth/authContext';
import UserLine from './UserLine';
import styles from './Bookings.module.scss';
import { useMutation } from '@apollo/client';
import { UPDATE_BOOKING } from '../../mutations/mutations';
import AlertContext from '../../context/alert/alertContext';

const Bookings = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKINGS);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const handleCancelBooking = (id) => {
    const input = {
      id,
      bookingChanges: {
        cancelled: true,
        moneyReturned: true,
        newBookingId: null
      }
    };
    const txt = 'Are you sure you want to cancel this booking?';
    confirm(txt) && cancelBooking({ variables: { input } });
  };

  const [cancelBooking] = useMutation(UPDATE_BOOKING, {
    onCompleted: ({ updateBookedCar: { success, message } }) => {
      if (success) {
        setAlert('Booking canceled successfully', 'success');
      } else {
        setAlert('Something went wrong', 'danger');
        console.log('error:', message);
      }
    },
    onError: (error) => {
      console.log('error:', error.message);
    },
    refetchQueries: [{ query: GET_ALL_BOOKINGS }]
  });

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

  return (
    <>
      {data && !(user.role === 'ADMIN' || user.role === 'SUPERVISOR') ? (
        <div className={styles.error__message}>
          <h5>You need to be higher rank to perform this action</h5>
        </div>
      ) : (
        <div className={styles.bookings__wrapper}>
          <div className={styles.bookings__table}>
            <table>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Car</th>
                  <th>Rent</th>
                  <th>Update</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.bookedCars.map((booking) =>
                  booking.bookingChanges.cancelled === null &&
                  booking.bookingChanges.newBookingId === null ? (
                    <UserLine
                      key={booking.id}
                      booking={booking}
                      handleCancelBooking={() => handleCancelBooking(booking.id)}
                    />
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
