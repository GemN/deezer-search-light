import { combineReducers } from 'redux';
import { tracks, tracksQueryLoading, tracksQueryError } from './tracksReducer';

export default combineReducers({
  tracks,
  tracksQueryLoading,
  tracksQueryError,
});
