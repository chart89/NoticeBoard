
import { useSelector, useDispatch } from 'react-redux';
import { getNotice, loadNoticesRequest } from '../../../redux/noticeRedux';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import NoticeList from '../../features/NoticeList/NoticeList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const Home = () => {
  const dispatch = useDispatch();

  const notices = useSelector(getNotice);
  
  useEffect(() => {
    dispatch(loadNoticesRequest())
  }, [dispatch]);

  return (
  <>
    <Container className="my-3">
      <Row>
        <Col><h1>All offers</h1></Col>
          <Col xs={2}>
            <Nav className="justify-content-end">
              <Nav.Link className="pe-0" as={NavLink} to="/notice/add"><Button variant="outline-info">Add notice</Button>{' '}</Nav.Link>
            </Nav>
          </Col>
      </Row>
    </Container>
    <Container>
      <Row>
      {notices && notices.map(notice => <NoticeList key={notice._id} {...notice} />)}
      </Row>
    </Container>
  </>
);
};

export default Home;


