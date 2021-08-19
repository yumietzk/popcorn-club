import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHorrorMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Horror = ({ fetchHorrorMovies }) => {
  useEffect(() => {
    fetchHorrorMovies();
  });

  return <Genre title="Movies" type="Horror" genre="horror" />;
};

export default connect(null, {
  fetchHorrorMovies,
})(Horror);
