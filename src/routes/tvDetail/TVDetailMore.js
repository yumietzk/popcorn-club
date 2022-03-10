import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { fetchTVSeasons } from '../../actions';
import TVDetailSeasons from './TVDetailSeasons';
import TVDetailEpisodes from './TVDetailEpisodes';
import React from 'react';

const TVDetailMore = ({
  id,
  name,
  width,
  fetchTVSeasons,
  seasons,
  isFetching,
  isError,
}) => {
  const { number } = useParams();

  useEffect(() => {
    fetchTVSeasons(id, number);
  }, [number]);

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <TVDetailSeasons
              name={name}
              width={width}
              seasons={seasons}
              isFetching={isFetching}
              isError={isError}
            />
          }
        />
        <Route
          path="episode/:episodenum"
          element={
            <TVDetailEpisodes
              name={name}
              seasons={seasons}
              isFetching={isFetching}
              isError={isError}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    seasons: state.detail.tvseasons,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchTVSeasons,
})(TVDetailMore);
