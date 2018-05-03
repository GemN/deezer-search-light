import {
  SEARCH_TRACK_QUEUE,
  SEARCH_TRACK_QUERY,
  FILTER_TRACKS_BY,
  ORDER_TRACKS_BY,
  TRACKS_QUERY_ERROR,
  TRACKS_QUERY_LOADING,
  TRACKS_QUERY_SUCCESS,
} from '../constants/actionsTypes';

import { mergeTracksData } from '../utils/index';

const initialState = {
  searchValue: '',
  filterBy: 'all',
  currentOrder: null,
  data: [],
  busy: false,
  lastIndex: 0,
};

const tracks = (state = initialState, action) => {
  switch (action.type) {
    case TRACKS_QUERY_SUCCESS:
      return {
        ...state,
        data: action.loadMore ? mergeTracksData(state.data, action.data) : action.data,
        lastIndex: action.index,
      };
    case SEARCH_TRACK_QUERY:
      return { ...state, searchValue: action.searchValue, busy: false };
    case SEARCH_TRACK_QUEUE:
      return { ...state, busy: action.busy };
    case FILTER_TRACKS_BY:
      return { ...state, filterBy: action.filterBy };
    case ORDER_TRACKS_BY:
      return { ...state, currentOrder: action.order, lastIndex: 0 };
    default:
      return state;
  }
};

const tracksQueryError = (state = false, action) => {
  switch (action.type) {
    case TRACKS_QUERY_ERROR:
      return action.error;
    default:
      return state;
  }
};

const tracksQueryLoading = (state = false, action) => {
  switch (action.type) {
    case TRACKS_QUERY_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export { tracks, tracksQueryError, tracksQueryLoading };
