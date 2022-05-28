import React, { useState, useContext } from 'react';
import styles from './Login.module.scss';
import AlertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    password2: ''
  });
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { email, name, password2, password } = user;

  const onChange = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const submitForm = (event) => {
    event.preventDefault();
    if (email === '' || name === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords need to be the same!', 'danger');
    } else {
      console.log('Submit success');
    }
  };
  return (
    <div className={styles.formWrapper}>
      <h1>
        <span>Account Register</span>
      </h1>
      <form onSubmit={submitForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" value={name} name="name" onChange={onChange} />
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
            minLength={5}
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
            minLength={5}
          />
        </div>
        <input type="submit" value="Register" className={styles.btn} />
      </form>
      <div className={styles.registerLink}>
        <p>You already have an account? </p>
        <Link to={'/Login'}>Log in</Link>
      </div>
    </div>
  );
};

export default Registration;
