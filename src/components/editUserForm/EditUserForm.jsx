import React, { useState } from 'react';
import styles from './EditUserForm.module.scss';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../mutations/mutations';
import { GET_ALL_USERS } from '../../queries/queries';

const EditUserForm = ({ user }) => {
  console.log('*user*', user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      id: user.id,
      firstName,
      lastName,
      email
    },
    refetchQueries: [{ query: GET_ALL_USERS }]
  });

  return (
    <>
      <div className={styles.edit__user__wrapper}>
        <h3>Update User Details</h3>
        <div className={styles.edit__user__form}>
          <form>
            <div className={styles.name__group}>
              <div className={styles.form__element}>
                <label className={styles.form__label}>First Name</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label}>Last Name</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.form__email}>
              <div className={styles.form__element}>
                <label className={styles.form__label}>Email</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button onClick={updateUser} className={styles.button__update}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

EditUserForm.propTypes = {
  user: PropTypes.object
};

export default EditUserForm;
