import React from 'react';
import styles from './User.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../queries/queries';
import EditUserForm from '../editUserForm/EditUserForm';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CarContext from '../../context/car/carContext';

const User = () => {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const navigate = useNavigate();
  const carContext = useContext(CarContext);
  const { changeTab } = carContext;

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
    if (user.isAdmin) {
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
            <h1>
              {user[0].firstName} {user[0].lastName}
            </h1>
            <div className={styles.user__form}>
              <EditUserForm userIs={userId} user={user[0]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
