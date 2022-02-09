import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchMovies, searchTVShows } from '../actions';
import CardGrid from '../components/UI/CardGrid/CardGrid';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './Search.module.css';

const Search = ({
  setIsDetail,
  searchMovies,
  searchTVShows,
  movies,
  tvshows,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  const [selectedLibrary, setSelectedLibrary] = useState('movies');
  const { term } = useParams();

  useEffect(() => {
    setIsDetail(true);

    return () => {
      setIsDetail(false);
    };
  }, []);

  useEffect(() => {
    searchMovies(term);
    searchTVShows(term);
    setSelectedLibrary('movies');
  }, [term]);

  const selectMovies = () => {
    setSelectedLibrary('movies');
  };

  const selectTVShows = () => {
    setSelectedLibrary('tvshows');
  };

  const renderContent = () => {
    if (selectedLibrary === 'movies') {
      if (isFetching || !movies) {
        return <LoadingIndicator />;
      }
    } else if (selectedLibrary === 'tvshows') {
      if (isFetchingTV || !tvshows) {
        return <LoadingIndicator />;
      }
    }

    if (isError?.status) {
      return <p className={styles.error}>{isError.errorMessage}</p>;
    }

    if (selectedLibrary === 'movies') {
      if (movies) {
        if (movies.length === 0) {
          return <p className={styles['no-data']}>Sorry, no data.</p>;
        } else {
          return <CardGrid group="search" data={movies} />;
        }
      }
    } else if (selectedLibrary === 'tvshows') {
      if (tvshows) {
        if (tvshows.length === 0) {
          return <p className={styles['no-data']}>Sorry, no data.</p>;
        } else {
          return <CardGrid group="searchTV" data={tvshows} />;
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.title}>
        <div className={styles['title-left']}>
          <div className={styles['title-name']}>Search</div>
          <div className={styles.term}>Results for "{term}"</div>
        </div>
        <div className={styles['title-right']}>
          <button
            className={`${styles['title-btn']} ${
              selectedLibrary === 'movies' && styles.selected
            }`}
            onClick={selectMovies}
          >
            Movies
          </button>
          <button
            className={`${styles['title-btn']} ${
              selectedLibrary === 'tvshows' && styles.selected
            }`}
            onClick={selectTVShows}
          >
            TV Shows
          </button>
        </div>
      </div>
      {renderContent()}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.search,
    tvshows: state.shows.search,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  searchMovies,
  searchTVShows,
})(Search);
