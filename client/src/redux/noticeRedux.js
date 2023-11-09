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
const EDIT_NOTICE = createActionName('EDIT_NOTICE');
const DELETE_NOTICE = createActionName('REMOVE_NOTICE');



// action creators
export const loadNotices = payload => ({ payload, type: LOAD_NOTICES });
export const addNotice = payload => ({ type: ADD_NOTICE, payload });
export const editNotice = payload => ({ type: EDIT_NOTICE, payload });
export const deleteNotice = payload => ({ type: DELETE_NOTICE, payload });

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

export const addNoticeRequest = ({title, content, date, price, localization, picture, login}) => {
  return async dispatch => {

    try {
      
      const fd = new FormData();
        fd.append('title', title);
        fd.append('content', content);
        fd.append('date', date);
        fd.append('price', price);
        fd.append('localization', localization);
        fd.append('picture', picture);
        fd.append('login', login);

        const options = {
            method: 'POST',
            credentials: 'include',
            body: fd
        };
        await fetch(API_URL + '/notice', options)
        dispatch(addNotice({title, content, date, price, localization, picture}));
    } catch (err) {
      console.log(err);
    }
  } 
};

export const editNoticeRequest = ({title, content, date, price, localization, picture, id }) => {
  return async dispatch => {

    try {
      
      const fd = new FormData();
        fd.append('title', title);
        fd.append('content', content);
        fd.append('date', date);
        fd.append('price', price);
        fd.append('localization', localization);
        fd.append('picture', picture);
        fd.append('id', id);

        const options = {
            method: 'PUT',
            credentials: 'include',
            body: fd
        };
        await fetch(API_URL + '/notice/' + id, options)
        dispatch(editNotice({title, content, date, price, localization, picture}));
    } catch (err) {
      console.log(err);
    }
  } 
};

export const deleteNoticeRequest = () => {
  return async dispatch => {

    try {

      const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
      }
    await fetch(API_URL + '/notice/' + id, options)
    dispatch(deleteNotice(id));

    } catch(e) {
      console.log(e);
    }

  };
};




/* REDUCER */

const noticeReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_NOTICES: 
      return { ...statePart, data: [...action.payload] };
    case ADD_NOTICE: 
      return { ...statePart, data: [...statePart.data, action.payload] };
    case EDIT_NOTICE: 
      return statePart.data.map(not => (not._id === action.payload.id ? { ...not, ...action.payload } : not));
    case DELETE_NOTICE:
      return statePart.data.filter(not => not._id !== action.payload);
    default:
      return statePart;
  }
};

export default noticeReducer;
