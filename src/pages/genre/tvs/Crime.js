import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCrimeTv } from '../../../actions';
import Genre from '../../../components/Genre';

const CrimeShow = ({ fetchCrimeTv }) => {
  useEffect(() => {
    fetchCrimeTv();
  }, []);

  return <Genre title="TV Shows" type="Crime" genre="crimeshow" />;
};

export default connect(null, {
  fetchCrimeTv,
})(CrimeShow);
