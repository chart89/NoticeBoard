import AddNoticeForm from "../../features/AddNoticeForm/AddNoticeForm";
import styles from "../../features/NoticeForm/NoticeForm.module.scss";


const Add = () => {

    return (
        <>
        <div>
            <h1>Add notice</h1>
        </div>
        <div className={styles.form}>
            <AddNoticeForm />
        </div>
        </>
    );
}

export default Add;