import React from 'react';
import styles from './TopBar.module.scss';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserGroup = ({ userName, userLoggedIn, onLogout, notify }) => {
  return userLoggedIn ? (
    <div className={styles.userGroup}>
      <div className={styles.avatar}>
        <Avatar name={userName} size="40" round={true} colors={['#dde4f9', '#7b97ec', '#4f77ef']} />
      </div>
      <p>{userName}</p>
      <div
        className={styles.logoutIcon}
        onClick={() => {
          onLogout();
          notify();
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          />
        </svg>
      </div>
    </div>
  ) : (
    <div className={styles.userGroup}>
      <p>Login</p>
      <Link to={'/login'}>
        <div className={styles.logoutIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
            />
          </svg>
        </div>
      </Link>
      <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss />
    </div>
  );
};

UserGroup.propTypes = {
  userName: PropTypes.string,
  onLogout: PropTypes.func,
  notify: PropTypes.func,
  userLoggedIn: PropTypes.bool
};

export default UserGroup;
