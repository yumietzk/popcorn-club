import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRealityTv } from '../../../actions';
import Genre from '../../../components/Genre';

const RealityShow = ({ fetchRealityTv, realityshow, isFetching, isError }) => {
  useEffect(() => {
    fetchRealityTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Reality"
      data={realityshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    realityshow: state.genre.realityshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchRealityTv,
})(RealityShow);
