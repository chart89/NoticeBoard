import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getNoticeById } from '../../../redux/noticeRedux';
import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './SingleNotice.module.scss';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const SingleNotice = () => {

    const { id } = useParams();

    const NoticeData = useSelector(data => getNoticeById(data, id));

    return (
        <Container>
            <Card className="my-5 mx-auto" style={{ width: '25rem' }}>
                <Card.Img variant="top" className={styles.noticeIMG} src="https://images.pexels.com/photos/3089389/pexels-photo-3089389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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
                        <Nav.Link className="pe-0" as={NavLink} to={'/notice/edit/' + NoticeData._id}><Button variant="outline-info">Edit</Button>{' '}</Nav.Link>
                    </Nav>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SingleNotice;