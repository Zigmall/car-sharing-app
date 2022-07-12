import React from 'react';
import styles from './User.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../queries/queries';
import EditUserForm from '../editUserForm/EditUserForm';

const User = () => {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_ALL_USERS);

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

  return (
    <>
      {data && (
        <div className={styles.left__space}>
          <div className={styles.user__wrapper}>
            <div className={styles.button__wrapper}>
              <a href="/users" className={styles.button__back}>
                Back
              </a>
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
