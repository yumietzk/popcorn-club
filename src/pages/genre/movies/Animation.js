import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAnimationMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Animation = ({ fetchAnimationMovies }) => {
  useEffect(() => {
    fetchAnimationMovies();
  });

  return <Genre title="Movies" type="Animation" genre="animation" />;
};

export default connect(null, {
  fetchAnimationMovies,
})(Animation);
