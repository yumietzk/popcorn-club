import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRealityTv } from '../../../actions';
import Genre from '../../../components/Genre';

const RealityShow = (props) => {
  useEffect(() => {
    props.fetchRealityTv();
  }, []);

  return <Genre title="TV Shows" type="Reality" genre="realityshow" />;
};

export default connect(null, {
  fetchRealityTv,
})(RealityShow);
