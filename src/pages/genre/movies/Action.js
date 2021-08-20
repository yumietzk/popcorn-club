import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchActionMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Action = ({ fetchActionMovies, action, isFetching, isError }) => {
  useEffect(() => {
    fetchActionMovies();
  }, []);

  return (
    <Genre
      title="Movies"
      type="Action"
      data={action}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    action: state.genre.action,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchActionMovies,
})(Action);
