import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchActionAdventureTv } from '../../../actions';
import Genre from '../Genre';

const ActionAdventureShow = (props) => {
  useEffect(() => {
    props.fetchActionAdventureTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Action &amp; Adventure"
      genre="actionadventureshow"
    />
  );
};

export default connect(null, {
  fetchActionAdventureTv: fetchActionAdventureTv,
})(ActionAdventureShow);
