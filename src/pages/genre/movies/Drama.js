import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDramaMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Drama = ({ fetchDramaMovies, drama, isFetching, isError }) => {
  useEffect(() => {
    fetchDramaMovies();
  });

  return (
    <Genre
      title="Movies"
      type="Drama"
      data={drama}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    drama: state.genre.drama,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchDramaMovies,
})(Drama);
