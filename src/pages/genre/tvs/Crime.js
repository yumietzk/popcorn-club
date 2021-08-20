import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCrimeTv } from '../../../actions';
import Genre from '../../../components/Genre';

const CrimeShow = ({ fetchCrimeTv, crimeshow, isFetching, isError }) => {
  useEffect(() => {
    fetchCrimeTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Crime"
      data={crimeshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    crimeshow: state.genre.crimeshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchCrimeTv,
})(CrimeShow);
