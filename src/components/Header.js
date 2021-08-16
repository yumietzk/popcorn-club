import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as IoIcons from 'react-icons/io';
import { searchMovies, searchTvShows } from '../actions';
import Navbar from './Navbar';
import styles from './Header.module.css';

const Header = (props) => {
  const [term, setTerm] = useState('');

  const onSearchTerm = (e) => {
    e.preventDefault();

    if (term.trim().length === 0) return;

    props.searchMovies(term);
    props.searchTvShows(term);
    setTerm('');
  };

  return (
    <Navbar>
      <Link to="/" className={styles.title}>
        Popcorn Club
      </Link>
      <form className={styles.form} onSubmit={onSearchTerm}>
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
    </Navbar>
  );
};

export default connect(null, {
  searchMovies: searchMovies,
  searchTvShows: searchTvShows,
})(Header);
