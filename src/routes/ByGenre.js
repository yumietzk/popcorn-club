import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMoviesByGenre, fetchTVShowsByGenre } from '../actions';
import CardGrid from '../components/UI/CardUI/CardGrid';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './ByGenre.module.css';

const ByGenre = ({
  selectedItem,
  isAscend,
  type,
  group,
  movies,
  tvshows,
  fetchMoviesByGenre,
  fetchTVShowsByGenre,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  const { category, order, count } = selectedItem;

  useEffect(() => {
    if (type === 'movies') {
      fetchMoviesByGenre(category, count);
    } else if (type === 'tvshows') {
      fetchTVShowsByGenre(category, count);
    }
  }, [category, count]);

  const renderContent = () => {
    if (type === 'movies') {
      if (isFetching || !movies) {
        return <LoadingIndicator />;
      }
    } else if (type === 'tvshows') {
      if (isFetchingTV || !tvshows) {
        return <LoadingIndicator />;
      }
    }

    if (isError?.status) {
      return <p className={styles.error}>{isError.errorMessage}</p>;
    }

    if (type === 'movies') {
      if (movies) {
        if (movies.length === 0) {
          return <p className={styles['no-data']}>Sorry, no data.</p>;
        } else {
          return (
            <CardGrid
              group={group}
              order={order}
              count={count}
              isAscend={isAscend}
              data={movies}
            />
          );
        }
      }
    } else if (type === 'tvshows') {
      if (tvshows) {
        if (tvshows.length === 0) {
          return <p className={styles['no-data']}>Sorry, no data.</p>;
        } else {
          return (
            <CardGrid
              group={group}
              order={order}
              count={count}
              isAscend={isAscend}
              data={tvshows}
            />
          );
        }
      }
    }
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.byGenre,
    tvshows: state.shows.byGenre,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMoviesByGenre,
  fetchTVShowsByGenre,
})(ByGenre);
