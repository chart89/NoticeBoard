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
const ADD_NOTICE = createActionName('ADD_NOTICE');

// action creators
export const loadNotices = payload => ({ payload, type: LOAD_NOTICES });
export const addNotice = payload => ({ type: ADD_NOTICE, payload });

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

export const addNoticeRequest = ({title, content, date, price, localization, picture}) => {
  return async dispatch => {

    try {
      
      const fd = new FormData();
        fd.append('title', title);
        fd.append('content', content);
        fd.append('date', date);
        fd.append('price', price);
        fd.append('localization', localization);
        fd.append('picture', picture);

        const options = {
            method: 'POST',
            body: fd
        };
        //let res = await axios.post(`${API_URL}/notice`, options);
        await fetch(API_URL + '/notice', options)
        dispatch(addNotice({title, content, date, price, localization, picture}));
    } catch (err) {
      console.log(err);
    }
  } 
}


/* REDUCER */

const noticeReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_NOTICES: 
    return { ...statePart, data: [...action.payload] };
    case ADD_NOTICE: 
      return { ...statePart, data: [...statePart.data, action.payload] }
    default:
      return statePart;
  }
};

export default noticeReducer;
