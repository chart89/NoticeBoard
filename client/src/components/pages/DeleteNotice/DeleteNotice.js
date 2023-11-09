import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteNoticeRequest } from '../../../redux/noticeRedux';
import { useNavigate } from "react-router-dom";
import styles from '../SingleNotice/SingleNotice.module.scss';

const DeleteNotice = ({ id }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = () => {
        handleClose();
        dispatch(deleteNoticeRequest(id));
        navigate('/');
    };

  return (
    <>
      <Button className={styles.button} variant="outline-danger" onClick={handleShow}>
        <span className={styles.spanBut}>Delete</span>
      </Button>{' '}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This operation will completly remove this notice from the app! Are you sure you want that?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleRemove()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteNotice;