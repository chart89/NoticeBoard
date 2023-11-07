import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import SingleNotice from './components/pages/SingleNotice/SingleNotice';
import Edit from './components/pages/Edit/Edit';
import Add from './components/pages/Add/Add';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';

// import routes
import Home from './components/pages/Home/HomePage';
import { Container } from 'react-bootstrap';


const App = () => (
  <Container>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notice/add" element={<Add />} />
        <Route path="/notice/:id" element={<SingleNotice />} />
        <Route path="/notice/edit/:id" element={<Edit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </MainLayout>
  </Container>
);

export default App;
