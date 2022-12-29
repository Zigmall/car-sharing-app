import React from 'react';
import styles from './User.module.scss';
import EditUserForm from '../editUserForm/EditUserForm';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CarContext from '../../context/car/carContext';
import AuthContext from '../../context/auth/authContext';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../queries/queries';

const User = () => {
  const navigate = useNavigate();
  const carContext = useContext(CarContext);
  const { changeTab } = carContext;
  const authContext = useContext(AuthContext);
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId }
  });
  if (loading)
    return (
      <div className={styles.left__space}>
        <div className={styles.error__message}>
          <p>Loading...</p>
        </div>
      </div>
    );
  if (error) {
    console.log(error);
    return <p>Something went wrong error</p>;
  }
  const { user } = data;
  const { user: currentUser } = authContext;
  const goBack = () => {
    if (currentUser.role === 'ADMIN') {
      navigate('/users');
    } else {
      changeTab(1);
      navigate('/');
    }
  };
  return (
    <>
      {user && (
        <div className={styles.left__space}>
          <div className={styles.user__wrapper}>
            <div className={styles.button__wrapper}>
              <button
                onClick={goBack}
                to={user.role === 'ADMIN' ? '/users' : '/'}
                className={styles.button__back}>
                Back
              </button>
            </div>
            <h1>Update personal data</h1>
            <div className={styles.user__form}>
              <EditUserForm
                user={user}
                completeForBooking={false}
                checkIfUserHasAllData={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
