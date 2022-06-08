import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import PropTypes from 'prop-types';

import {
  LOGIN_USER
  //     LOGIN_FAIL,
  //     USER_LOADED,
  //     REGISTER_FAIL,
  //     REGISTER_SUCCESS,
  //     AUTH_ERROR,
  //     CLEAN_ERRORS
  //     LOGOUT,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User

  //Register User

  //Login
  const loginUser = (token) => {
    localStorage.setItem('token', token);
    dispatch({
      type: LOGIN_USER,
      payload: token
    });
  };

  //Logout

  //Clean errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loginUser
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthState.propTypes = {
  children: PropTypes.any
};

export default AuthState;
