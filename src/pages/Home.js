import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchMovieNowPlaying,
  fetchTvOnAir,
  fetchFavoriteMovies,
  fetchFavoriteTVs,
} from '../actions';
import Row from '../components/Row';
import HomeFavorite from '../components/HomeFavorite';
import styles from './Home.module.css';

const Home = (props) => {
  useEffect(() => {
    props.fetchMovieNowPlaying();
    props.fetchTvOnAir();
    props.fetchFavoriteMovies();
    props.fetchFavoriteTVs();
  }, []);

  return (
    <div className={styles.home}>
      <h3 className={styles.title}>Home</h3>
      <Row category="Movies" group="Movie" type="nowplaying" cname="wide" />
      <Row category="TV Shows" group="TV Show" type="onair" cname="wide" />
      <div className={styles.favorite}>
        <p className={styles.category}>Favorite</p>
        <div className={styles.contents}>
          <HomeFavorite type="Movies" />
          <HomeFavorite type="TV Shows" />
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  fetchMovieNowPlaying,
  fetchTvOnAir,
  fetchFavoriteMovies,
  fetchFavoriteTVs,
})(Home);
