import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDocumentaryTv } from '../../../actions';
import Genre from '../../../components/Genre';

const DocumentaryShow = ({
  fetchDocumentaryTv,
  documentaryshow,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchDocumentaryTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Documentary"
      data={documentaryshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    documentaryshow: state.genre.documentaryshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchDocumentaryTv,
})(DocumentaryShow);
