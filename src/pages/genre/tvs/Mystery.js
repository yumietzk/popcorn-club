import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMysteryTv } from '../../../actions';
import Genre from '../../../components/Genre';

const MysteryShow = ({ fetchMysteryTv, mysteryshow, isFetching, isError }) => {
  useEffect(() => {
    fetchMysteryTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Mystery"
      data={mysteryshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    mysteryshow: state.genre.mysteryshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMysteryTv,
})(MysteryShow);
