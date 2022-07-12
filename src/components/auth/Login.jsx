import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useMutation } from '@apollo/client';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { LOG_IN } from '../../mutations/mutations';

const Login = () => {
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;

  const [login] = useMutation(LOG_IN, {
    onCompleted: ({ logIn: { success, message, token, currentUser } }) => {
      setAlert(message, success ? 'info' : 'danger');
      const resData = { currentUser, token };
      loginUser(resData);
      success && navigate('/');
    }
  });

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const input = {
      email,
      password
    };
    login({ variables: { input } });
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
        <div className={styles.button__wrapper}>
          <input type="submit" value="login" className={styles.btn} />
        </div>
      </form>
      <div className={styles.registerLink}>
        <p>Don&apos;t have account? </p>
        <Link to={'/Registration'}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
