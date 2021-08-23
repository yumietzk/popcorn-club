import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSciFiMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Scifi = ({ fetchSciFiMovies, scifi, isFetching, isError }) => {
  useEffect(() => {
    fetchSciFiMovies();
  }, []);

  return (
    <Genre
      title="Movies"
      type="Science Fiction"
      data={scifi}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    scifi: state.genre.scifi,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchSciFiMovies,
})(Scifi);
