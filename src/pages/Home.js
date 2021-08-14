import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovieNowPlaying, fetchTvOnAir } from '../actions';
import MovieRow from '../components/movies/MovieRow';
import TvRow from '../components/tvs/TvRow';
import HomeFavorite from '../components/HomeFavorite';
// import requests from '../apis/requests';
import styles from './Home.module.css';

const Home = (props) => {
  useEffect(() => {
    props.fetchMovieNowPlaying();
    props.fetchTvOnAir();
  }, []);

  return (
    <div className={styles.home}>
      <h3 className={styles.title}>Home</h3>

      <MovieRow
        // url={requests.fetchMovieNowPlaying}
        category="Movies"
        type="nowplaying"
        cname="wide"
      />
      <TvRow category="TV Shows" type="onair" cname="wide" />
      <div className={styles.favorite}>
        <p className={styles.category}>Favorite</p>
        {/* <p>No favorites yet.</p> */}

        <div className={styles.container}>
          <HomeFavorite />
          <HomeFavorite />
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  fetchMovieNowPlaying: fetchMovieNowPlaying,
  fetchTvOnAir: fetchTvOnAir,
})(Home);
