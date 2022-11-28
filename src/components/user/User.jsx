import React from 'react';
import styles from './User.module.scss';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GET_USER } from '../../queries/queries';
import EditUserForm from '../editUserForm/EditUserForm';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CarContext from '../../context/car/carContext';
import AuthContext from '../../context/auth/authContext';

const User = () => {
  const navigate = useNavigate();
  const carContext = useContext(CarContext);
  const { changeTab } = carContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const goBack = () => {
    if (user.isAdmin) {
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
                to={user.isAdmin ? '/users' : '/'}
                className={styles.button__back}>
                Back
              </button>
            </div>
            <h1>Update personal data</h1>
            <div className={styles.user__form}>
              <EditUserForm user={user} completeForBooking={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
