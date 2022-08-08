import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import styles from './Login.module.scss';
import AlertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import CarContext from '../../context/car/carContext';
import { SIGN_UP } from '../../mutations/mutations';

const Registration = () => {
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;
  const carContext = useContext(CarContext);
  const { changeTab } = carContext;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: ''
  });
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { email, firstName, lastName, password2, password } = user;

  const onChange = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const submitForm = (event) => {
    event.preventDefault();
    if (email === '' || firstName === '' || lastName === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords need to be the same!', 'danger');
    } else {
      const input = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
      };
      signUp({ variables: { input } });
    }
  };

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: ({ signUp }) => {
      const { success, message, currentUser, token } = signUp;
      if (success) {
        setAlert(message, 'success');
        const resData = { currentUser, token };
        loginUser(resData);
        changeTab(1);
        success && navigate('/');
      }
    },
    onError: (error) => {
      setAlert(error.message, 'danger');
    }
  });

  return (
    <div className={styles.formWrapper}>
      <h1>
        <span>Account Register</span>
      </h1>
      <form onSubmit={submitForm}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First name</label>
          <input type="text" value={firstName} name="firstName" onChange={onChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last name</label>
          <input type="text" value={lastName} name="lastName" onChange={onChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input type="text" value={email} name="email" onChange={onChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <input type="submit" value="Register" className={styles.btn} />
      </form>
      <div className={styles.registerLink}>
        <p>You already have an account? </p>
        <Link to={'/login'}>Log in</Link>
      </div>
    </div>
  );
};

export default Registration;
