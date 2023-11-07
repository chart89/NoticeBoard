import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './NoticeForm.module.scss';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";


const NoticeForm = ({ action, actionText, ...props }) => {

    const [title, setTitle] = useState(props.title || '');
    const [price, setPrice] = useState(props.price || '');
    const [date, setDate] = useState(props.date || '');
    const [content, setContent] = useState(props.content || '');
    const [localization, setLocalization] = useState(props.localization || '');
    const [picture, setPicture] = useState(props.picture || null);
  
    const { register, handleSubmit: validate, formState: { errors } } = useForm();
    

    const handleSubmit = e => {
        
          action({ title, content, date, price, localization, picture, });
        
      };

    return (
        <Form onSubmit={validate(handleSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control className={styles.input} 
            {...register("title", { required: true, minLength: 3 })}
            type="text" 
            placeholder="Enter title" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            />
          {errors.title && <small className="d-block form-text text-danger mt-2">This field is required (min 3)</small>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Short description</Form.Label>
            <Form.Control 
            {...register("content", { required: true, minLength: 20 })}
            as="textarea" 
            rows={3} 
            placeholder="Leave a short description" 
            value={content} 
            onChange={e => setContent(e.target.value)} />
          {errors.content && <small className="d-block form-text text-danger mt-2">This field is required (min 20)</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control className={styles.input}
            {...register("date", { required: true, minLength: 3 })}
            type="text"
            placeholder="Enter date" 
            value={date} 
            onChange={e => setDate(e.target.value)} />
          {errors.date && <small className="d-block form-text text-danger mt-2">This field is required (min 3)</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control className={styles.input} 
            {...register("price", { required: true, minLength: 3 })}
            type="text" 
            placeholder="Enter price" 
            value={price} 
            onChange={e => setPrice(e.target.value)}
            />
          {errors.price && <small className="d-block form-text text-danger mt-2">This field is required (min 3)</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Localization</Form.Label>
            <Form.Control className={styles.input} 
            {...register("localization", { required: true, minLength: 3 })}
            type="text" 
            placeholder="Enter localization" 
            value={localization} 
            onChange={e => setLocalization(e.target.value)}
            />
          {errors.localization && <small className="d-block form-text text-danger mt-2">This field is required (min 3)</small>}
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select file</Form.Label>
            <Form.Control className={styles.input} type="file" onChange={e => setPicture(e.target.files[0])} />
          </Form.Group>

          <Button variant="primary" type="submit">
            {actionText}
          </Button>
        </Form>
    );
}

export default NoticeForm;

NoticeForm.propTypes = {
    action: PropTypes.func,
    actionText: PropTypes.string,
    title: PropTypes.string,
  };


