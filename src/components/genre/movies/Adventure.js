import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAdventureMovies } from '../../../actions';
import Genre from '../Genre';

const Adventure = (props) => {
  useEffect(() => {
    props.fetchAdventureMovies();
  }, []);

  return <Genre title="Movies" type="Adventure" genre="adventure" />;
};

export default connect(null, {
  fetchAdventureMovies: fetchAdventureMovies,
})(Adventure);
