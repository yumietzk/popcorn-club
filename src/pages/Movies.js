import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchMovieTopRated,
} from '../actions';
import MovieHeader from '../components/MovieHeader';
import Row from '../components/Row';
import styles from './Movies.module.css';

const Movies = ({
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchMovieTopRated,
  popular,
  upcoming,
  toprated,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchMoviePopular();
    fetchMovieUpcoming();
    fetchMovieTopRated();
  }, []);

  return (
    <div className={styles.movies}>
      <div className={styles.title}>
        <h3 className={styles.menu}>Movies</h3>
      </div>
      <MovieHeader data={popular} isFetching={isFetching} isError={isError} />
      <Row
        category="Upcoming"
        group="Movie"
        cname="wide"
        data={upcoming}
        isFetching={isFetching}
        isError={isError}
      />
      <Row
        category="Top Rated"
        group="Movie"
        data={toprated}
        isFetching={isFetching}
        isError={isError}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    popular: state.movies.popular,
    upcoming: state.movies.upcoming,
    toprated: state.movies.toprated,
    isFetching: state.movies.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchMovieTopRated,
})(Movies);
