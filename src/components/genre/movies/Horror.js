import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHorrorMovies } from '../../../actions';
import Genre from '../Genre';

const Horror = (props) => {
  useEffect(() => {
    props.fetchHorrorMovies();
  }, []);

  return <Genre title="Movies" type="Horror" genre="horror" />;
};

export default connect(null, {
  fetchHorrorMovies: fetchHorrorMovies,
})(Horror);
