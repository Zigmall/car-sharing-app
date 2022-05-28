import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Login user');
  };
  return (
    <div className={styles.formWrapper}>
      <h1>
        <span>Account Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <input type="submit" value="login" className={styles.btn} />
      </form>
      <div className={styles.registerLink}>
        <p>Don&apos;t have account? </p>
        <Link to={'/Registration'}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
