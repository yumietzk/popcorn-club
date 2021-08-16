import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDramaMovies } from '../../../actions';
import Genre from '../Genre';

const Drama = (props) => {
  useEffect(() => {
    props.fetchDramaMovies();
  }, []);

  return <Genre title="Movies" type="Drama" genre="drama" />;
};

export default connect(null, {
  fetchDramaMovies: fetchDramaMovies,
})(Drama);
