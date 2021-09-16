import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as IoIcons from 'react-icons/io';
import { searchMovies, searchTvShows } from '../../actions';
import Navbar from './Navbar';
import GoogleAuth from '../auth/GoogleAuth';
import history from '../../history';
import styles from './Header.module.css';

const Header = ({ searchMovies, searchTvShows }) => {
  const [term, setTerm] = useState('');

  const onSearchTerm = (e) => {
    e.preventDefault();

    if (term.trim().length === 0) return;

    searchMovies(term);
    searchTvShows(term);
    history.push(`/search/${term}`);

    setTerm('');
  };

  return (
    <Navbar>
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
    </Navbar>
  );
};

export default connect(null, {
  searchMovies,
  searchTvShows,
})(Header);
