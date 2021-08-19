import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDramaMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Drama = ({ fetchDramaMovies }) => {
  useEffect(() => {
    fetchDramaMovies();
  });

  return <Genre title="Movies" type="Drama" genre="drama" />;
};

export default connect(null, {
  fetchDramaMovies,
})(Drama);
