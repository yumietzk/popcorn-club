import React from 'react';
import { connect } from 'react-redux';
import Row from '../components/Row';
import styles from './Search.module.css';

const Search = ({
  movies,
  shows,
  searchTerm,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  return (
    <div className={styles.search}>
      <h3 className={styles.title}>Search results for "{searchTerm}"</h3>
      <Row
        category="Movies"
        group="Movie"
        data={movies}
        isFetching={isFetching}
        isError={isError}
      />
      <Row
        category="TV Shows"
        group="TV Show"
        data={shows}
        isFetching={isFetchingTV}
        isError={isError}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.search,
    shows: state.shows.search,
    searchTerm: state.movies.searchTerm,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps)(Search);
