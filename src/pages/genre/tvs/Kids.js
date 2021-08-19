import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchKidsTv } from '../../../actions';
import Genre from '../../../components/Genre';

const KidsShow = ({ fetchKidsTv }) => {
  useEffect(() => {
    fetchKidsTv();
  }, []);

  return <Genre title="TV Shows" type="Kids" genre="kidsshow" />;
};

export default connect(null, {
  fetchKidsTv,
})(KidsShow);
