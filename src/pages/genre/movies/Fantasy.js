import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchFantasyMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Fantasy = (props) => {
  useEffect(() => {
    props.fetchFantasyMovies();
  });

  return <Genre title="Movies" type="Fantasy" genre="fantasy" />;
};

export default connect(null, {
  fetchFantasyMovies,
})(Fantasy);
