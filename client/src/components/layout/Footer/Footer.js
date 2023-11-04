import styles from './Footer.module.scss';

const Footer = () => {

    return (
        <div className={styles.footerDiv}>
            <p>Copyright <span><i className="fa fa-copyright"></i></span> NoticeBoard.App 2023</p>
        </div>
    );
};

export default Footer;