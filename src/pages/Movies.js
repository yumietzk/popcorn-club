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

const Movies = (props) => {
  useEffect(() => {
    props.fetchMoviePopular();
    props.fetchMovieUpcoming();
    props.fetchMovieTopRated();
  }, []);

  return (
    <div className={styles.movies}>
      <div className={styles.title}>
        <h3 className={styles.menu}>Movies</h3>
      </div>
      <MovieHeader />
      <Row category="Upcoming" group="Movie" type="upcoming" cname="wide" />
      <Row category="Top Rated" group="Movie" type="toprated" />
    </div>
  );
};

export default connect(null, {
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchMovieTopRated,
})(Movies);
