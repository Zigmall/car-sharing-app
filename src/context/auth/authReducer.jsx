import { LOGIN_USER, LOAD_USER, LOGOUT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.currentUser,
        loading: false,
        isAuthenticated: true
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload.currentUser,
        loading: false,
        isAuthenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false
      };

    default:
      return state;
  }
};
