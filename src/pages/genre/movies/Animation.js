import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAnimationMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Animation = ({
  fetchAnimationMovies,
  animation,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchAnimationMovies();
  }, []);

  return (
    <Genre
      title="Movies"
      type="Animation"
      data={animation}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    animation: state.genre.animation,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchAnimationMovies,
})(Animation);
