import React from 'react';
import styles from './User.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../queries/queries';
import EditUserForm from '../editUserForm/EditUserForm';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CarContext from '../../context/car/carContext';
import AuthContext from '../../context/auth/authContext';

const User = () => {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const navigate = useNavigate();
  const carContext = useContext(CarContext);
  const { changeTab } = carContext;
  const authContext = useContext(AuthContext);
  const { user: currentUser } = authContext;

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>Something went wrong</p>
        </div>
      </div>
    );
  }

  const user = data.allUsers.filter((user) => user.id === userId);

  const goBack = () => {
    if (currentUser.isAdmin) {
      navigate('/users');
    } else {
      changeTab(1);
      navigate('/');
    }
  };
  return (
    <>
      {data && (
        <div className={styles.left__space}>
          <div className={styles.user__wrapper}>
            <div className={styles.button__wrapper}>
              <button
                onClick={goBack}
                to={user.isAdmin ? '/users' : '/'}
                className={styles.button__back}>
                Back
              </button>
            </div>
            <h1>Update personal data</h1>
            <div className={styles.user__form}>
              <EditUserForm completeForBooking={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
