import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAnimationTv } from '../../../actions';
import Genre from '../../../components/Genre';

const AnimationShow = (props) => {
  useEffect(() => {
    props.fetchAnimationTv();
  }, []);

  return <Genre title="TV Shows" type="Animation" genre="animationshow" />;
};

export default connect(null, {
  fetchAnimationTv,
})(AnimationShow);
