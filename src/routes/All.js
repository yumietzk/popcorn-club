import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllMovies, fetchAllTVShows } from '../actions';
import CardGrid from '../components/UI/CardGrid/CardGrid';

const All = ({
  selectedItem,
  isAscend,
  isClearAll,
  type,
  group,
  fetchAllMovies,
  fetchAllTVShows,
  movies,
  tvshows,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  const { order, count } = selectedItem;

  useEffect(() => {
    if (type === 'movies') {
      fetchAllMovies(count);
    } else if (type === 'tvshows') {
      fetchAllTVShows(count);
    }
  }, [isClearAll, count]);

  return (
    <CardGrid
      group={group}
      // order={order}
      selectedItem={selectedItem}
      isAscend={isAscend}
      data={type === 'movies' ? movies : tvshows}
      isFetching={type === 'movies' ? isFetching : isFetchingTV}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.all, // 60
    tvshows: state.shows.all,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchAllMovies,
  fetchAllTVShows,
})(All);
