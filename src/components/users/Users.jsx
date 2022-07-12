import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../queries/queries';
import styles from './Users.module.scss';
import UserRow from './UserRow';

const Users = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Something went wrong</p>;
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
            </tr>
          </thead>
          <tbody>
            {data.allUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
