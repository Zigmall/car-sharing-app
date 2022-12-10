import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKERS } from '../../../queries/queries';
import AuthContext from '../../../context/auth/authContext';
import UserLine from './UserLine';
import styles from './Bookings.module.scss';

const Bookings = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKERS);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  if (loading)
    return (
      <div className={styles.bookings__wrapper}>
        <div className={styles.error__message}>
          <p>Loading...</p>
        </div>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null) {
      return (
        <div className={styles.bookings__wrapper}>
          <div className={styles.error__message}>
            <p>You need to be log in to see this page</p>
          </div>
        </div>
      );
    }
    return <p>Something went wrong error</p>;
  }

  return (
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
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {data.bookedCars.map((booking) => (
              <UserLine key={booking.id} booking={booking} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
