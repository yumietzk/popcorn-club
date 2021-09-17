import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTvPopular, fetchTvTopRated } from '../actions';
import Row from '../components/Row';
import styles from './Tvshows.module.css';

const Tvshows = ({
  fetchTvPopular,
  fetchTvTopRated,
  popular,
  toprated,
  isFetchingTV,
  isError,
}) => {
  useEffect(() => {
    fetchTvPopular();
    fetchTvTopRated();
  }, []);

  return (
    <div className={styles.tv}>
      <h3 className={styles.title}>TV Shows</h3>
      <Row
        category="Popular"
        group="TV Show"
        data={popular}
        isFetching={isFetchingTV}
        isError={isError}
      />
      <Row
        category="Top Rated"
        group="TV Show"
        data={toprated}
        isFetching={isFetchingTV}
        isError={isError}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    popular: state.shows.popular,
    toprated: state.shows.toprated,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchTvPopular,
  fetchTvTopRated,
})(Tvshows);
