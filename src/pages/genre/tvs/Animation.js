import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAnimationTv } from '../../../actions';
import Genre from '../../../components/Genre';

const AnimationShow = ({
  fetchAnimationTv,
  animationshow,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchAnimationTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Animation"
      data={animationshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    animationshow: state.genre.animationshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchAnimationTv,
})(AnimationShow);
