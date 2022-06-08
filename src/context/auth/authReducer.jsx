import { LOGIN_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
