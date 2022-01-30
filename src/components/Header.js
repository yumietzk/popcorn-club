import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import GoogleAuth from './auth/GoogleAuth';
import styles from './Header.module.css';

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const [term, setTerm] = useState('');
  const ref = useRef();
  const navigate = useNavigate();

  const onSearchTerm = (e) => {
    e.preventDefault();

    // ここのエラーハンドリングなんかしたいな
    if (term.trim().length === 0) return;

    navigate(`/search/${term}`);

    setTerm('');
    ref.current.blur();
  };

  const handleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <FaIcons.FaBars
          onClick={handleSidebar}
          className={styles['menu-icon']}
        />
      </div>
      <Link to="/" className={styles.title}>
        Popcorn Club
      </Link>
      <div className={styles.form}>
        <form className={styles['search-form']} onSubmit={onSearchTerm}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            ref={ref}
          />
          <button className={styles.btn}>
            <IoIcons.IoIosSearch className={styles['btn-icon']} />
          </button>
        </form>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
