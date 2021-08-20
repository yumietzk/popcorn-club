import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchComedyTv } from '../../../actions';
import Genre from '../../../components/Genre';

const ComedyShow = ({ fetchComedyTv, comedyshow, isFetching, isError }) => {
  useEffect(() => {
    fetchComedyTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Comedy"
      data={comedyshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    comedyshow: state.genre.comedyshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchComedyTv,
})(ComedyShow);
