import axios from 'axios';
import { store } from '../../app';

import {
  FILTER_TRACKS_BY,
  ORDER_TRACKS_BY,
  SEARCH_TRACK_QUERY,
  SEARCH_TRACK_QUEUE,
  TRACKS_QUERY_ERROR,
  TRACKS_QUERY_LOADING,
  TRACKS_QUERY_SUCCESS,
} from '../constants/actionsTypes';

export const searckTrackQueryError = bool => ({
  type: TRACKS_QUERY_ERROR,
  error: bool,
});

export const searckTrackQueryLoading = bool => ({
  type: TRACKS_QUERY_LOADING,
  loading: bool,
});

export const searckTrackQuerySuccess = ({ data, index, loadMore }) => ({
  type: TRACKS_QUERY_SUCCESS,
  data,
  index,
  loadMore,
});

export const filterTracksBy = filterBy => ({
  type: FILTER_TRACKS_BY,
  filterBy,
});

export const searchTrackQuery = searchValue => ({
  type: SEARCH_TRACK_QUERY,
  searchValue,
});

export const orderTrackBy = order => ({
  type: ORDER_TRACKS_BY,
  order,
});

export const searchTrackQueue = () => ({
  type: SEARCH_TRACK_QUEUE,
  busy: true,
});

export const searchTrack = ({ searchValue, index, limit, orderKey, loadMore }) => (dispatch) => {
  dispatch(searckTrackQueryLoading(true));
  dispatch(searchTrackQuery(searchValue));
  const searchOpts = {
    searchValue,
    index: index || 0,
    limit: limit || 25,
  };
  const { tracks } = store.getState();

  let queryUrl = `/api/search/track?q=${searchOpts.searchValue}&index=${searchOpts.index}&limit=${searchOpts.limit}`;
  if (orderKey) {
    queryUrl += `&order=${orderKey}`;
  } else if (tracks.currentOrder !== null && tracks.currentOrder.orderKey) {
    queryUrl += `&order=${tracks.currentOrder.orderKey}`;
  }

  return axios.get(queryUrl)
    .then((res) => {
      dispatch(searckTrackQueryLoading(false));
      dispatch(searckTrackQuerySuccess({ data: res.data, index: searchOpts.index, loadMore }));
    })
    .catch(() => {
      dispatch(searckTrackQueryError(true));
      dispatch(searckTrackQueryLoading(false));
    });
};

export const loadMoreTracks = () => (dispatch) => {
  const { tracksQueryLoading, tracks } = store.getState();

  if (!tracksQueryLoading) {
    dispatch(searchTrack({ searchValue: tracks.searchValue, index: tracks.lastIndex + 25, loadMore: true }));
  }
};

export const orderBy = order => (dispatch) => {
  const { tracks } = store.getState();
  dispatch(orderTrackBy(order));
  dispatch(searchTrack({ searchValue: tracks.searchValue, orderKey: order.orderKey }));
};
