import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDramaTv } from '../../../actions';
import Genre from '../../../components/Genre';

const DramaShow = ({ fetchDramaTv, dramashow, isFetching, isError }) => {
  useEffect(() => {
    fetchDramaTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Drama"
      data={dramashow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dramashow: state.genre.dramashow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchDramaTv,
})(DramaShow);
