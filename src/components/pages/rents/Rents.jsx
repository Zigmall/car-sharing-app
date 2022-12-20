import { useContext } from 'react';
import styles from './Rents.module.scss';
import { useQuery } from '@apollo/client';
import { GET_ALL_RENTS } from '../../../queries/queries';
import AuthContext from '../../../context/auth/authContext';
import RentLine from './RentLine';
import AlertContext from '../../../context/alert/alertContext';

const Rents = () => {
  const { loading, error, data } = useQuery(GET_ALL_RENTS);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  if (loading)
    return (
      <div className={styles.rents__wrapper}>
        <div className={styles.error__message}>
          <p>Loading...</p>
        </div>
      </div>
    );

  if (error) {
    console.log(error);
  }
  if (user === null) {
    setAlert('You are not authorized to view this page', 'danger');
    return (
      <div className={styles.rents__wrapper}>
        <div className={styles.error__message}>
          <p>You need to be log in to see this page</p>
        </div>
      </div>
    );
  }
  const { rents } = data;
  return (
    <>
      {data && (
        <div className={styles.rents__wrapper}>
          <div className={styles.rents__table}>
            <table>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Start Date</th>
                  <th>Pick up Day</th>
                  <th>End Date</th>
                  <th>Return Day</th>
                  <th>Car</th>
                  <th>Rent</th>
                  <th>Returns</th>
                </tr>
              </thead>
              <tbody>
                {rents.map(
                  (rent) => {
                    // console.log('rent >>>', rent);
                    return <RentLine key={rent.id} rent={rent} />;
                  }
                  //   ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Rents;
