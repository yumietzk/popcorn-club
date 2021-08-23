import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFantasyMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Fantasy = ({ fetchFantasyMovies, fantasy, isFetching, isError }) => {
  useEffect(() => {
    fetchFantasyMovies();
  }, []);

  return (
    <Genre
      title="Movies"
      type="Fantasy"
      data={fantasy}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    fantasy: state.genre.fantasy,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchFantasyMovies,
})(Fantasy);
