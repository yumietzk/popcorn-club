import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteMovies, fetchFavoriteTVs } from '../actions';
import Row from '../components/Row';
import styles from './Favorite.module.css';

const Favorite = ({
  fetchFavoriteMovies,
  fetchFavoriteTVs,
  moviefavorite,
  tvfavorite,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  useEffect(() => {
    fetchFavoriteMovies();
    fetchFavoriteTVs();
  }, []);

  return (
    <div className={styles.favorite}>
      <div className={styles.title}>
        <h3 className={styles.menu}>Favorite</h3>
      </div>
      <Row
        category="Movies"
        group="Movie"
        data={moviefavorite}
        isFetching={isFetching}
        isError={isError}
      />
      <Row
        category="TV Shows"
        group="TV Show"
        data={tvfavorite}
        isFetching={isFetchingTV}
        isError={isError}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    moviefavorite: state.movies.favorite,
    tvfavorite: state.shows.favorite,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchFavoriteMovies: fetchFavoriteMovies,
  fetchFavoriteTVs: fetchFavoriteTVs,
})(Favorite);
