import React, { useState, useContext } from 'react';
import styles from './EditUserForm.module.scss';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, UPDATE_MY_PERSONAL_DATA } from '../../mutations/mutations';
import { GET_ALL_USERS, GET_CURRENT_USER } from '../../queries/queries';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const EditUserForm = ({ user }) => {
  // console.log('user', user);
  const authContext = useContext(AuthContext);
  const { user: currentUser } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [country, setCountry] = useState(user.address.country);
  const [city, setCity] = useState(user.address.city);
  const [street, setStreet] = useState(user.address.street);
  const [houseNumber, setHouseNumber] = useState(user.address.houseNumber);
  const [flatNumber, setFlatNumber] = useState(user.address.flatNumber);
  const [postCode, setPostCode] = useState(user.address.postCode);

  const [updateUser] = currentUser.isAdmin
    ? useMutation(UPDATE_USER, {
        variables: {
          input: {
            id: user.id,
            firstName,
            lastName,
            email,
            mobile,
            isAdmin,
            address: { country, city, street, houseNumber, flatNumber, postCode }
          }
        },
        onCompleted: () => {
          setAlert('User has been updated', 'success');
        },
        refetchQueries: [{ query: GET_ALL_USERS }]
      })
    : useMutation(UPDATE_MY_PERSONAL_DATA, {
        variables: {
          input: {
            id: user.id,
            firstName,
            lastName,
            email,
            mobile,
            address: { country, city, street, houseNumber, flatNumber, postCode }
          }
        },
        onCompleted: () => {
          setAlert('Your data has been updated', 'success');
          // authContext.setUser(currentUser);
        },
        refetchQueries: [{ query: GET_CURRENT_USER }]
      });

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '') {
      setAlert('Please fill out all fields', 'warning');
    } else {
      updateUser();
    }
  };

  return (
    <>
      <div className={styles.edit__user__wrapper}>
        <h3>Update User Details</h3>
        <h4>* Mandatory field</h4>
        <div className={styles.edit__user__form}>
          <form onSubmit={handleUpdateUser}>
            <div className={styles.name__group}>
              <div className={styles.form__element}>
                <label className={styles.form__label}>* First Name </label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label}>* Last Name</label>
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
                <label className={styles.form__label}>* Email</label>
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

            {currentUser && currentUser.isAdmin && (
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
            )}

            <h2>Address</h2>
            <div className={styles.name__group}>
              <div className={styles.form__element}>
                <label className={styles.form__label}>Country</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label}>City</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.name__group}>
              <div className={styles.form__element}>
                <label className={styles.form__label}>Street</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label}>House number</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="houseNumber"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.name__group}>
              <div className={styles.form__element}>
                <label className={styles.form__label}>Flat number</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="flatNumber"
                  value={flatNumber}
                  onChange={(e) => setFlatNumber(e.target.value)}
                />
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label}>Postcode</label>
                <input
                  type="text"
                  className={styles.form__input}
                  id="postCode"
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </div>
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