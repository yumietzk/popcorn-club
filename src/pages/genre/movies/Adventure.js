import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAdventureMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Adventure = ({
  fetchAdventureMovies,
  adventure,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchAdventureMovies();
  }, []);

  return (
    <Genre
      title="Movies"
      type="Adventure"
      data={adventure}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adventure: state.genre.adventure,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchAdventureMovies,
})(Adventure);
