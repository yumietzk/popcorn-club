import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchActionMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Action = (props) => {
  useEffect(() => {
    console.log('Update!!');
    props.fetchActionMovies();
  }, []);

  // const { id } = props.match.params;

  return <Genre title="Movies" type="Action" genre="action" />;
};

export default connect(null, {
  fetchActionMovies,
})(Action);
