import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteMovies, fetchFavoriteTVShows } from '../actions';
import AltTitle from '../components/AltTitle';
import LibraryContent from '../components/LibraryContent';
import styles from './Favorite.module.css';

const Favorite = ({
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
  favoriteMovies,
  favoriteTVShows,
  isFetching,
  isFetchingTV,
  isError,
  isSignedIn,
}) => {
  const [selectedLibrary, setSelectedLibrary] = useState('movies');
  const [data, setData] = useState({});

  useEffect(() => {
    fetchFavoriteMovies();
    fetchFavoriteTVShows();
    setSelectedLibrary('movies');
  }, []);

  useEffect(() => {
    setData({ ...data, movies: favoriteMovies, tvshows: favoriteTVShows });
  }, [favoriteMovies, favoriteTVShows]);

  const renderContent = () => {
    if (isSignedIn) {
      return (
        <LibraryContent
          selectedLibrary={selectedLibrary}
          type="favorite"
          data={data}
          isFetching={isFetching}
          isFetchingTV={isFetchingTV}
          isError={isError}
        />
      );
    } else {
      return (
        <div className={styles.message}>
          <p>Please sign in to see a favorite page.</p>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <AltTitle
        title="Favorite"
        selectedLibrary={selectedLibrary}
        setSelectedLibrary={setSelectedLibrary}
      />
      {renderContent()}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    favoriteMovies: state.movies.favorite,
    favoriteTVShows: state.shows.favorite,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
})(Favorite);
