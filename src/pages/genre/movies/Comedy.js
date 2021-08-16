import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchComedyMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Comedy = (props) => {
  useEffect(() => {
    props.fetchComedyMovies();
  });

  return <Genre title="Movies" type="Comedy" genre="comedy" />;
};

export default connect(null, {
  fetchComedyMovies,
})(Comedy);
