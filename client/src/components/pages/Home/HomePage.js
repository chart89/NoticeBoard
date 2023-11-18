
import { useSelector, useDispatch } from 'react-redux';
import { getNotice, loadNoticesRequest } from '../../../redux/noticeRedux';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import NoticeList from '../../features/NoticeList/NoticeList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getUser } from '../../../redux/userRedux';
import Form from 'react-bootstrap/Form';
import { useNavigate  } from 'react-router-dom';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notices = useSelector(getNotice);
  const isUser = useSelector(getUser);
  
  useEffect(() => {
    dispatch(loadNoticesRequest())
  }, [dispatch]);

  const [searchPr, setSearchPr] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/notice/search/${searchPr}`);
  };

  return (
  <>
    <Container className="my-3">
      <Row>
        
          <Form className="col-12 col-sm-3 mx-auto my-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Control type="text" value = {searchPr} onChange={e => setSearchPr(e.target.value)} placeholder="Search" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
      </Row>
      <Row>
        <Col><h1>All offers</h1></Col>
          <Col xs={2}>
            <Nav className="justify-content-end">
              {isUser !== null && <Nav.Link className="pe-0" as={NavLink} to="/notice/add"><Button variant="outline-info">Add notice</Button>{' '}</Nav.Link>}
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


