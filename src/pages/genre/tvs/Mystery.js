import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMysteryTv } from '../../../actions';
import Genre from '../../../components/Genre';

const MysteryShow = ({ fetchMysteryTv }) => {
  useEffect(() => {
    fetchMysteryTv();
  }, []);

  return <Genre title="TV Shows" type="Mystery" genre="mysteryshow" />;
};

export default connect(null, {
  fetchMysteryTv,
})(MysteryShow);
