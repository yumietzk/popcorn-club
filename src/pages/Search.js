import React from 'react';
import MovieRow from '../components/movies/MovieRow';
import TvRow from '../components/tvs/TvRow';
import styles from './Search.module.css';

const Search = () => {
  return (
    <div className={styles.search}>
      <h3 className={styles.title}>Search results</h3>
      <MovieRow category="Movies" type="search" />
      <TvRow category="TV Shows" type="search" />
    </div>
  );
};

export default Search;
