
import { createStore } from 'redux';
import rootReducer from '../reducers/tracksReducer';

const store = createStore(rootReducer);

export default store;
