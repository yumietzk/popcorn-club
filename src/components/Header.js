import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import SearchInput from './UI/SearchInput/SearchInput';
import GoogleAuth from './auth/GoogleAuth';
import styles from './Header.module.css';

const Header = ({ isCollapsed, setIsCollapsed, isMobile, setIsMobile }) => {
  const handleSidebar = () => {
    setIsCollapsed(!isCollapsed);

    if (isMobile.state) {
      setIsMobile({ ...isMobile, sidebar: !isMobile.sidebar });
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <FaIcons.FaBars
          onClick={handleSidebar}
          className={styles['menu-icon']}
          data-testid="menu-btn"
        />
      </div>
      <Link to="/" className={styles.title}>
        Popcorn Club
      </Link>
      <div className={styles.form}>
        <SearchInput />
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
