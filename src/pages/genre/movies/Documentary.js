import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDocumentaryMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Documentary = ({
  fetchDocumentaryMovies,
  documentary,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchDocumentaryMovies();
  });

  return (
    <Genre
      title="Movies"
      type="Documentary"
      data={documentary}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    documentary: state.genre.documentary,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchDocumentaryMovies,
})(Documentary);
