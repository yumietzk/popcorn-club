import React from 'react';
import Row from '../components/Row';
import styles from './Search.module.css';

const Search = () => {
  return (
    <div className={styles.search}>
      <h3 className={styles.title}>Search results</h3>
      <Row category="Movies" group="Movie" type="search" />
      <Row category="TV Shows" group="TV Show" type="search" />
    </div>
  );
};

export default Search;
