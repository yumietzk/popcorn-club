import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRomanceMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Romance = (props) => {
  useEffect(() => {
    props.fetchRomanceMovies();
  });

  return <Genre title="Movies" type="Romance" genre="romance" />;
};

export default connect(null, {
  fetchRomanceMovies,
})(Romance);
