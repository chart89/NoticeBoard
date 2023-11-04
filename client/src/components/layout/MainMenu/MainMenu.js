import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import styles from './MainMenu.module.scss';

const MainMenu = () => {
return (
    <Navbar bg="primary" data-bs-theme="dark" className='rounded justify-content-between'>
            <div className={styles.navDiv}>
                <p className='my-auto'>NoticeBoard.app</p>
            </div>
            <div className={styles.navDiv}>
                <Nav>
                    <Nav.Link  as={NavLink} to={'/'}><p className={'my-auto ' + styles.link}>Home</p></Nav.Link>
                    <Nav.Link  as={NavLink} to={'/register'}><p className={'my-auto ' + styles.link}>Register</p></Nav.Link>
                    <Nav.Link  as={NavLink} to={'/'}><p className={'my-auto ' + styles.link}>Log in</p></Nav.Link>
                    <Nav.Link  as={NavLink} to={'/'}><p className={'my-auto ' + styles.link}>Log out</p></Nav.Link>
                </Nav>
            </div>
    </Navbar>
)
};

export default MainMenu;