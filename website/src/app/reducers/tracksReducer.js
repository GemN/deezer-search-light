import { SEARCH_TRACK, SEARCH_TRACK_QUEUE } from '../constants/actionsTypes';

const initialState = {
  searchValue: '',
  tracks: [],
  loading: false,
  timeout: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TRACK:
      return { ...state, searchValue: action.payload, loading: false };
    case SEARCH_TRACK_QUEUE:
      if (state.timeout) {
        clearTimeout(state.timeout);
      }
      return { ...state, timeout: action.payload, loading: true };
    default:
      return state;
  }
};

export default rootReducer;
