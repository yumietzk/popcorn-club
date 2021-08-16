import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSciFiMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Scifi = (props) => {
  useEffect(() => {
    props.fetchSciFiMovies();
  });

  return <Genre title="Movies" type="Science Fiction" genre="scifi" />;
};

export default connect(null, {
  fetchSciFiMovies,
})(Scifi);
