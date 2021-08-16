import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDocumentaryMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Documentary = (props) => {
  useEffect(() => {
    props.fetchDocumentaryMovies();
  });

  return <Genre title="Movies" type="Documentary" genre="documentary" />;
};

export default connect(null, {
  fetchDocumentaryMovies,
})(Documentary);
