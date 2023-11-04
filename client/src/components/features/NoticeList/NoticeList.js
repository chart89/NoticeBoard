import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './NoticeList.module.scss';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config';

const NoticeList = ({ title, localization, _id, picture }) => {

    console.log(IMGS_URL, title)

    return (
        <div>
            <Row className="my-3">
                <Col className='border'>
                    <Row><h2>{ title }</h2></Row>
                    <Row><p>Localization: <span className="fw-bold">{ localization }</span></p></Row> 
                    <Row>
                        <Nav>
                            <Nav.Link as={NavLink} to={'/notice/' + _id}><Button variant="primary">Show more</Button>{' '}</Nav.Link>
                        </Nav>
                    </Row>         
                </Col>
                <Col>
                <img className={styles.noticeIMG} src= {IMGS_URL + '/' + picture} alt={picture}/>
                </Col>
            </Row>
        </div>
    );
};

export default NoticeList;