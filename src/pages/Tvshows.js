import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTvPopular, fetchTvTopRated } from '../actions';
import TvRow from '../components/tvs/TvRow';
import styles from './Tvshows.module.css';

const Tvshows = (props) => {
  useEffect(() => {
    props.fetchTvPopular();
    props.fetchTvTopRated();
  }, []);

  return (
    <div className={styles.tv}>
      <h3 className={styles.title}>TV Shows</h3>
      <TvRow category="Popular" type="popular" />
      <TvRow category="Top Rated" type="toprated" />
      {/* <TVrow
        url="/tv/latest?api_key=8a45061d820fb7b5b5f574766f028ff6"
        category="Latest"
      /> */}
    </div>
  );
};

export default connect(null, {
  fetchTvPopular: fetchTvPopular,
  fetchTvTopRated: fetchTvTopRated,
})(Tvshows);
