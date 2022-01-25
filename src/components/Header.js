// New component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { searchMovies, searchTvShows } from '../actions';
import GoogleAuth from './auth/GoogleAuth';
// import history from '../history';
import styles from './Header.module.css';

const Header = ({
  isCollapsed,
  setIsCollapsed,
  searchMovies,
  searchTvShows,
}) => {
  const [term, setTerm] = useState('');

  const onSearchTerm = (e) => {
    e.preventDefault();

    if (term.trim().length === 0) return;

    searchMovies(term);
    searchTvShows(term);
    // history.push(`/search/${term}`);

    setTerm('');
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

export default connect(null, {
  searchMovies,
  searchTvShows,
})(Header);
