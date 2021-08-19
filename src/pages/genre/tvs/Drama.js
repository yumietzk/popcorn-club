import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDramaTv } from '../../../actions';
import Genre from '../../../components/Genre';

const DramaShow = ({ fetchDramaTv }) => {
  useEffect(() => {
    fetchDramaTv();
  }, []);

  return <Genre title="TV Shows" type="Drama" genre="dramashow" />;
};

export default connect(null, {
  fetchDramaTv,
})(DramaShow);
