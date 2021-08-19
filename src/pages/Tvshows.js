import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTvPopular, fetchTvTopRated } from '../actions';
import Row from '../components/Row';
import styles from './Tvshows.module.css';

const Tvshows = ({ fetchTvPopular, fetchTvTopRated }) => {
  useEffect(() => {
    fetchTvPopular();
    fetchTvTopRated();
  }, []);

  return (
    <div className={styles.tv}>
      <h3 className={styles.title}>TV Shows</h3>
      <Row category="Popular" group="TV Show" type="popular" />
      <Row category="Top Rated" group="TV Show" type="toprated" />
    </div>
  );
};

export default connect(null, {
  fetchTvPopular: fetchTvPopular,
  fetchTvTopRated: fetchTvTopRated,
})(Tvshows);
