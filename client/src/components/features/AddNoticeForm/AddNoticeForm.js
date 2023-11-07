import { useDispatch } from 'react-redux';
import NoticeForm from '../NoticeForm/NoticeForm';
import { useNavigate } from "react-router-dom";
import { addNoticeRequest } from '../../../redux/noticeRedux';

const AddNoticeForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = (notice) => {
      
      dispatch(addNoticeRequest({...notice}));
        
        navigate("/");
    };


    return (
      <NoticeForm action={handleSubmit} actionText="Add notice" />
    );
}

export default AddNoticeForm;

