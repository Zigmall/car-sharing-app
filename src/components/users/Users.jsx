import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../queries/queries';
import styles from './Users.module.scss';
import UserRow from './UserRow';
import AuthContext from '../../context/auth/authContext';

const Users = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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
    if (user === null) {
      return (
        <div className={styles.left__space}>
          <div className={styles.error__message}>
            <p>You need to be log in to see this page</p>
          </div>
        </div>
      );
    }
    return <p>Something went wrong error</p>;
  }
  return (
    <div className={styles.left__space}>
      <div className={styles.users__wrapper}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.allUsers.map((userElement) => (
              <UserRow key={userElement.id} user={userElement} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
