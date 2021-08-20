import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchKidsTv } from '../../../actions';
import Genre from '../../../components/Genre';

const KidsShow = ({ fetchKidsTv, kidsshow, isFetching, isError }) => {
  useEffect(() => {
    fetchKidsTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Kids"
      data={kidsshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    kidsshow: state.genre.kidsshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchKidsTv,
})(KidsShow);
