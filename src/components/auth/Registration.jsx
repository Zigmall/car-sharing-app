import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import styles from './Login.module.scss';
import AlertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { USER_FRAGMENT, CAR_COPY_FRAGMENT } from '../fragments/Fragments';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
      user {
        ...userFields
        borrowedCarCopies {
          ...carCopyFields
        }
      }
    }
  }

  ${USER_FRAGMENT}
  ${CAR_COPY_FRAGMENT}
`;

const Registration = () => {
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
      setAlert('You successfully created an account.', 'info');
      // navigate('/');
      const input = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      console.log('new User, sending...', input);
      createUser({ variables: { input } });
    }
  };

  const [createUser, { loading: isCreating }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      const { success, message, user } = createUser;
      !isCreating && console.log('123');
      if (success) {
        console.log('success', message, user);
        navigate('/');
      }
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
        <Link to={'/Login'}>Log in</Link>
      </div>
    </div>
  );
};

export default Registration;
