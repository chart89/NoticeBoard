import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/userRedux";
import { useEffect } from "react";
import { getUser } from "../../../redux/userRedux";
import { Navigate } from "react-router";


const Logout = () => {

    const dispatch = useDispatch();
    const isUser = useSelector(getUser);
    
    useEffect(() => {
    const options = {
        method: 'DELETE',
    }
    fetch(API_URL + '/auth/logout', options)
    .then(() => {
        dispatch(logOut());
    });
    },[dispatch]);

    if(isUser === null) return <Navigate to="/" />
    return null
};

export default Logout