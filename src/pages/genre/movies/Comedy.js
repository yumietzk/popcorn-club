import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchComedyMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Comedy = ({ fetchComedyMovies, comedy, isFetching, isError }) => {
  useEffect(() => {
    fetchComedyMovies();
  });

  return (
    <Genre
      title="Movies"
      type="Comedy"
      data={comedy}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    comedy: state.genre.comedy,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchComedyMovies,
})(Comedy);
