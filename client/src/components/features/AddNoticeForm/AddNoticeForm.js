import { useDispatch } from 'react-redux';
import NoticeForm from '../NoticeForm/NoticeForm';
import { useNavigate } from "react-router-dom";

const AddNoticeForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleSubmit = (notice) => {

        //dispatch(addPost(post));
        
        navigate("/");
    };


    return (
      <NoticeForm action={handleSubmit} actionText="Add notice" />
    );
}

export default AddNoticeForm;

