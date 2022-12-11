import { useContext } from 'react';
import styles from './Rent.module.scss';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_BOOKING_BY_ID } from '../../../queries/queries';
import AuthContext from '../../../context/auth/authContext';

const Rent = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_BOOKING_BY_ID, {
    variables: { bookedCarId: userId }
  });

  if (loading)
    return (
      <div className={styles.rent__wrapper}>
        <div className={styles.error__message}>
          <p>Loading...</p>
        </div>
      </div>
    );

  if (error) {
    console.log(error);
    if (user === null) {
      return (
        <div className={styles.rent__wrapper}>
          <div className={styles.error__message}>
            <p>You need to be log in to see this page</p>
          </div>
        </div>
      );
    }
    return <p>Something went wrong error</p>;
  }

  return (
    <>
      {data && (
        <div className={styles.rent__wrapper}>
          <h1>Rent</h1>
        </div>
      )}
    </>
  );
};

export default Rent;
