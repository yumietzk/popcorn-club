import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchActionAdventureTv } from '../../../actions';
import Genre from '../../../components/Genre';

const ActionAdventureShow = ({
  fetchActionAdventureTv,
  actionadventureshow,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchActionAdventureTv();
  }, []);

  return (
    <Genre
      title="TV Shows"
      type="Action &amp; Adventure"
      data={actionadventureshow}
      isFetching={isFetching}
      isError={isError}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    actionadventureshow: state.genre.actionadventureshow,
    isFetching: state.genre.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchActionAdventureTv,
})(ActionAdventureShow);
