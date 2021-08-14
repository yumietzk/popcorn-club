import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteMovies, fetchFavoriteTVs } from '../actions';
import MovieRow from '../components/movies/MovieRow';
import TvRow from '../components/tvs/TvRow';
import styles from './Favorite.module.css';

const Favorite = (props) => {
  useEffect(() => {
    props.fetchFavoriteMovies();
    props.fetchFavoriteTVs();
  }, []);

  return (
    <div className={styles.favorite}>
      <div className={styles.title}>
        <h3 className={styles.menu}>Favorite</h3>
      </div>
      <MovieRow category="Movies" type="favorite" />
      <TvRow category="TV Shows" type="favorite" />
    </div>
  );
};

export default connect(null, {
  fetchFavoriteMovies: fetchFavoriteMovies,
  fetchFavoriteTVs: fetchFavoriteTVs,
})(Favorite);
