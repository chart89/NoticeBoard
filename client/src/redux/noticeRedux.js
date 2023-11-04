import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getNotice = ({ notices }) => notices.data;
export const getNoticeById = ({ notices }, id) => notices.data.find(notice => notice._id === id);


/* ACTIONS */

// action name creator
const reducerName = 'notices';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_NOTICES = createActionName('LOAD_NOTICES');

// action creators
export const loadNotices = payload => ({ payload, type: LOAD_NOTICES });

/* THUNKS */

export const loadNoticesRequest = () => {
  return async dispatch => {

    try {

      let res = await axios.get(`${API_URL}/notice`);
      
      dispatch(loadNotices(res.data));

    } catch(e) {
      console.log(e);
    }

  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_NOTICES: 
    return { ...statePart, data: [...action.payload] };
    default:
      return statePart;
  }
}
