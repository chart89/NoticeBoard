import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import  initialState  from './initialState';

// import reducers
import noticeReducer from './noticeRedux';
import usersReducer from './userRedux';


const subreducers = {
  notices: noticeReducer,
  users: usersReducer
}
// combine reducers
const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
