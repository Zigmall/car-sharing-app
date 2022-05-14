import { GET_CARS, DIVIDE_CAR_LIST } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false
      };

    case DIVIDE_CAR_LIST:
      return {
        ...state,
        tableOfPages: action.payload,
        numberOfPages: action.payload.length,
        currentView: action.payload[0]
      };

    default:
      return state;
  }
};
