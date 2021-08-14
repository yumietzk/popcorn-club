import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDocumentaryTv } from '../../../actions';
import Genre from '../Genre';

const DocumentaryShow = (props) => {
  useEffect(() => {
    props.fetchDocumentaryTv();
  }, []);

  return <Genre title="TV Shows" type="Documentary" genre="documentaryshow" />;
};

export default connect(null, {
  fetchDocumentaryTv: fetchDocumentaryTv,
})(DocumentaryShow);
