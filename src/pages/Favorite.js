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
  isSignedIn,
}) => {
  useEffect(() => {
    if (isSignedIn) {
      fetchFavoriteMovies();
      fetchFavoriteTVs();
    }
  }, [isSignedIn]);

  const renderFavorites = () => {
    if (!isSignedIn) {
      return (
        <p className={styles.message}>
          Please sign in to save your favorite movies or TV shows in favorite
          section!
        </p>
      );
    } else {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    }
  };

  return (
    <div className={styles.favorite}>
      <div className={styles.title}>
        <h3 className={styles.menu}>Favorite</h3>
      </div>
      {renderFavorites()}
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
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchFavoriteMovies: fetchFavoriteMovies,
  fetchFavoriteTVs: fetchFavoriteTVs,
})(Favorite);
