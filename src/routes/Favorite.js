import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteMovies, fetchFavoriteTVShows } from '../actions';
import AltTitle from './AltTitle';
import LibraryContent from './LibraryContent';

const Favorite = ({
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
  favoriteMovies,
  favoriteTVShows,
  isFetching,
  isFetchingTV,
  isError,
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

  return (
    <React.Fragment>
      <AltTitle
        title="Favorite"
        selectedLibrary={selectedLibrary}
        setSelectedLibrary={setSelectedLibrary}
      />
      <LibraryContent
        selectedLibrary={selectedLibrary}
        type="favorite"
        data={data}
        isFetching={isFetching}
        isFetchingTV={isFetchingTV}
        isError={isError}
      />
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
  };
};

export default connect(mapStateToProps, {
  fetchFavoriteMovies,
  fetchFavoriteTVShows,
})(Favorite);
