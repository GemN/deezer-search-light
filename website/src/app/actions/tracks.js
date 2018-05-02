
import { SEARCH_TRACK, SEARCH_TRACK_QUEUE } from '../constants/actionsTypes';

export const searchTrack = searchValue => ({ type: SEARCH_TRACK, payload: searchValue });
export const searchTrackQueue = searchTimeout => ({ type: SEARCH_TRACK_QUEUE, payload: searchTimeout });
