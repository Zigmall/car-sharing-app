import { GET_CARS, DIVIDE_CAR_LIST, CHANGE_PAGE, CHANGE_TAB } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentIndex: action.payload,
        currentView: state.tableOfPages[action.payload - 1]
      };
    case CHANGE_TAB:
      return {
        ...state,
        navIndex: action.payload
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
