import { SEARCH_TRACK } from '../constants/actionsTypes';

const initialState = {
  searchValue: '',
  tracks: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TRACK:
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
};

export default rootReducer;