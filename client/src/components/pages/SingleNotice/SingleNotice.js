import { useParams, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getNoticeById } from '../../../redux/noticeRedux';
import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './SingleNotice.module.scss';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { IMGS_URL } from '../../../config';
import { getUser } from '../../../redux/userRedux';
import DeleteNotice from '../DeleteNotice/DeleteNotice';

const SingleNotice = () => {

    const { id } = useParams();

    const NoticeData = useSelector(data => getNoticeById(data, id));

    const isUser = useSelector(getUser);

    if(!NoticeData) return <Navigate to="/" />
    return (
        <Container>
            <Card className="my-5 mx-auto" style={{ width: '25rem' }}>
                <Card.Img variant="top" className={styles.noticeIMG} src={NoticeData.picture && IMGS_URL + '/' + NoticeData.picture} alt={NoticeData.picture} />
                <Card.Body>
                    <Card.Title>{ NoticeData.title }</Card.Title>
                    <Card.Text>
                        { NoticeData.content }
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Price: <span className="fw-bold">{ NoticeData.price }$</span></ListGroup.Item>
                    <ListGroup.Item>Localization: <span className="fw-bold">{ NoticeData.localization }</span></ListGroup.Item>
                    <ListGroup.Item>{ NoticeData.date }</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Nav>
                        {isUser !== null && NoticeData.saler.login === isUser.login && <Nav.Link className="pe-0" as={NavLink} to={'/notice/edit/' + NoticeData._id}><Button className={styles.button} variant="outline-info"><span className={styles.spanBut}>Edit</span></Button>{' '}</Nav.Link>}
                        {isUser !== null && NoticeData.saler.login === isUser.login && <DeleteNotice id={id} />}
                    </Nav>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SingleNotice;