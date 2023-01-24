import React, { useContext } from 'react';
import styles from './MyRents.module.scss';
import { useQuery } from '@apollo/client';
import { GET_RENTS_BY_USER_ID } from '../../queries/queries';
import AuthContext from '../../context/auth/authContext';
import UserRentListElement from './UserRentListElement';

const MyRents = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { loading, error, data } = useQuery(GET_RENTS_BY_USER_ID);

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
      {data && (
        <div className={styles.rents__wrapper}>
          <div className={styles.rents__table}>
            <table>
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>Pick up Day</th>
                  <th>End Date</th>
                  <th>Return Day</th>
                  <th>Car</th>
                  <th>Handling Over Card</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.rentsByUserId.map((rent) => {
                  return <UserRentListElement key={rent.id} rent={rent} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MyRents;
