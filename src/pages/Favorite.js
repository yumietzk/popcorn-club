import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteMovies, fetchFavoriteTVs } from '../actions';
import Row from '../components/Row';
import styles from './Favorite.module.css';

const Favorite = ({ fetchFavoriteMovies, fetchFavoriteTVs }) => {
  useEffect(() => {
    fetchFavoriteMovies();
    fetchFavoriteTVs();
  }, []);

  return (
    <div className={styles.favorite}>
      <div className={styles.title}>
        <h3 className={styles.menu}>Favorite</h3>
      </div>
      <Row category="Movies" group="Movie" type="favorite" />
      <Row category="TV Shows" group="TV Show" type="favorite" />
    </div>
  );
};

export default connect(null, {
  fetchFavoriteMovies: fetchFavoriteMovies,
  fetchFavoriteTVs: fetchFavoriteTVs,
})(Favorite);
