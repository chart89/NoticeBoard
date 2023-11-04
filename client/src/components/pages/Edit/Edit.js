import EditNoticeForm from "../../features/EditNoticeForm/EditNoticeForm";
import styles from '../../features/NoticeForm/NoticeForm.module.scss';

const Edit = () => {

    return (
        <>
        <div>
            <h1>Edit notice</h1>
        </div>
        <div className={styles.form}>
            <EditNoticeForm />
        </div>
        </>
    );
};

export default Edit;