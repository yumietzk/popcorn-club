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

const Home = ({
  fetchMovieNowPlaying,
  fetchTvOnAir,
  fetchFavoriteMovies,
  fetchFavoriteTVs,
  movies,
  shows,
  moviefavorite,
  tvfavorite,
  isFetching,
  isFetchingTV,
  isError,
  isSignedIn,
}) => {
  useEffect(() => {
    fetchMovieNowPlaying();
    fetchTvOnAir();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      fetchFavoriteMovies();
      fetchFavoriteTVs();
    }
  }, [isSignedIn]);

  const renderFavorite = () => {
    if (isSignedIn) {
      return (
        <div className={styles.contents}>
          <HomeFavorite
            type="Movies"
            data={moviefavorite}
            isFetching={isFetching}
            isError={isError}
          />
          <HomeFavorite
            type="TV Shows"
            data={tvfavorite}
            isFetching={isFetchingTV}
            isError={isError}
          />
        </div>
      );
    } else {
      return (
        <p className={styles['signin-message']}>
          Please sign in to save your favorite movies or TV shows in favorite
          section!
        </p>
      );
    }
  };

  return (
    <div className={styles.home}>
      <h3 className={styles.title}>Home</h3>
      <Row
        category="Movies"
        group="Movie"
        cname="wide"
        data={movies}
        isFetching={isFetching}
        isError={isError}
      />
      <Row
        category="TV Shows"
        group="TV Show"
        cname="wide"
        data={shows}
        isFetching={isFetchingTV}
        isError={isError}
      />
      <div
        className={`${styles.favorite} ${
          !isSignedIn ? styles.subheight : null
        }`}
      >
        <p className={styles.category}>Favorite</p>
        {renderFavorite()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.nowplaying,
    shows: state.shows.onair,
    moviefavorite: state.movies.favorite,
    tvfavorite: state.shows.favorite,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchMovieNowPlaying,
  fetchTvOnAir,
  fetchFavoriteMovies,
  fetchFavoriteTVs,
})(Home);
