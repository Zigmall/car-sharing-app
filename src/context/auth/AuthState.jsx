import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import PropTypes from 'prop-types';

import {
  LOGIN_USER,
  LOAD_USER,
  LOGOUT
  //     LOGIN_FAIL,
  //     REGISTER_FAIL,
  //     REGISTER_SUCCESS,
  //     AUTH_ERROR,
  //     CLEAN_ERRORS
} from '../types';

export const loadUser = () => {
  return localStorage.getItem('token') || null;
};

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
  const loadUser = (user) => {
    dispatch({
      type: LOAD_USER,
      payload: user
    });
  };

  //Register User

  //Login
  const loginUser = (data) => {
    localStorage.setItem('token', data.token);
    dispatch({
      type: LOGIN_USER,
      payload: data
    });
  };

  //Logout
  const logout = () => {
    localStorage.setItem('token', null);
    dispatch({
      type: LOGOUT
    });
  };
  //Clean errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loginUser,
        loadUser,
        logout
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthState.propTypes = {
  children: PropTypes.any
};

export default AuthState;
