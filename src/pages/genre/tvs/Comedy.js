import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchComedyTv } from '../../../actions';
import Genre from '../../../components/Genre';

const ComedyShow = ({ fetchComedyTv }) => {
  useEffect(() => {
    fetchComedyTv();
  }, []);

  return <Genre title="TV Shows" type="Comedy" genre="comedyshow" />;
};

export default connect(null, {
  fetchComedyTv,
})(ComedyShow);
