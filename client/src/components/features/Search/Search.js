import { useParams } from 'react-router';
import { getSearchPhrase } from '../../../redux/noticeRedux';
import { useSelector } from 'react-redux';
import NoticeList from '../NoticeList/NoticeList';
import { Col, Container, Row } from 'react-bootstrap';

const Search = () => {

    const { searchPhrase } = useParams();
    const searchData = useSelector(data => getSearchPhrase(data, searchPhrase));

    if(!searchData) return console.log('not found...');
    return (
        <Container className="my-3">
            <Row>
                <Col>
                    <h1>Found offers</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    {searchData.map(notice => <NoticeList key={notice._id} {...notice} />)}
                </Col>
            </Row> 
        </Container>
    )
};

export default Search;