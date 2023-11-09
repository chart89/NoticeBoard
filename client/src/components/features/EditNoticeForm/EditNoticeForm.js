
import { useDispatch } from 'react-redux';
import NoticeForm from "../NoticeForm/NoticeForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getNoticeById } from "../../../redux/noticeRedux";
import { useParams, Navigate } from 'react-router';
import { editNoticeRequest } from '../../../redux/noticeRedux';

const EditNoticeForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { id } = useParams();

    const NoticeData = useSelector(data => getNoticeById(data, id));

    const handleSubmit = notice => {

        dispatch(editNoticeRequest({...notice, id}));
        
        navigate("/");
    };

    if(!NoticeData) return <Navigate to="/" />
    return (
      <NoticeForm action={handleSubmit} actionText="Edit notice" {...NoticeData} />
    );
}

export default EditNoticeForm;