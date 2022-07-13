import React, { useState, useContext } from 'react';
import styles from './EditUserForm.module.scss';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../mutations/mutations';
import { GET_ALL_USERS } from '../../queries/queries';
import AlertContext from '../../context/alert/alertContext';

const EditUserForm = ({ user }) => {
  console.log('user', user);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { input: { id: user.id, firstName, lastName, email, mobile, isAdmin } },
    refetchQueries: [{ query: GET_ALL_USERS }]
  });

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if ((firstName === '' || lastName === '' || email === '', mobile === '')) {
      setAlert('Please fill out all fields', 'warning');
    } else {
      setAlert('User updated', 'success');
      console.log('values >>>', firstName, lastName, email, mobile, isAdmin);
      updateUser();
    }
  };

  return (
    <>
      <div className={styles.edit__user__wrapper}>
        <h3>Update User Details</h3>
        <div className={styles.edit__user__form}>
          <form onSubmit={handleUpdateUser}>
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

            <div className={styles.name__group}>
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

              <div className={styles.form__element}>
                <label className={styles.form__label}>Mobile</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.admin__wrapper}>
              <input
                type="checkbox"
                className={styles.admin__checkbox}
                id="admin"
                checked={isAdmin}
                onChange={() => handleCheckboxChange()}
              />
              <label className={styles.form__label}>Administrator</label>
            </div>

            <button type="submit" className={styles.button__update}>
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
