import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHorrorMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Horror = ({ fetchHorrorMovies, horror, isFetching, isError }) => {
  useEffect(() => {
    fetchHorrorMovies();
  }, []);

  return (
    <Genre
      title="Movies"
      type="Horror"
      data={horror}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    horror: state.genre.horror,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchHorrorMovies,
})(Horror);
