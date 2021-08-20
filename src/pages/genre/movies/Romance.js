import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRomanceMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Romance = ({ fetchRomanceMovies, romance, isFetching, isError }) => {
  useEffect(() => {
    fetchRomanceMovies();
  });

  return (
    <Genre
      title="Movies"
      type="Romance"
      data={romance}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    romance: state.genre.romance,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchRomanceMovies,
})(Romance);
