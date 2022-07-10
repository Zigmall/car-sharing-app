import React from 'react';
import styles from './User.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../queries/queries';
import EditUserForm from '../editUserForm/EditUserForm';

const User = () => {
  const { userId } = useParams();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Something went wrong</p>;
  }

  console.log('User >>>', data);

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
              {data.user.firstName} {data.user.lastName}
            </h1>
            <div className={styles.user__form}>
              <EditUserForm user={data.user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
