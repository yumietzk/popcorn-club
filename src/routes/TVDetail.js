import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { fetchTVDetail, fetchTVCredits, fetchTVRelated } from '../actions';
import Title from './Title';
import TVDetailContent from './TVDetailContent';
import TVDetailMore from './TVDetailMore';

const TVDetail = ({
  selectedItem,
  setSelectedItem,
  setDetailBackground,
  setIsDetail,
  fetchTVDetail,
  fetchTVCredits,
  fetchTVRelated,
  tvDetail,
  tvCasts,
  tvRelated,
  isFetching,
  isError,
}) => {
  const { id } = useParams();

  useEffect(() => {
    setIsDetail(true);

    return () => {
      setIsDetail(false);
    };
  }, []);

  useEffect(() => {
    fetchTVDetail(id);
    fetchTVCredits(id);
    fetchTVRelated(id);
  }, [id]);

  useEffect(() => {
    setDetailBackground({
      isON: true,
      url: tvDetail?.backdrop_path,
    });

    return () => {
      setDetailBackground({
        isON: false,
        url: '',
      });
    };
  }, [tvDetail]);

  return (
    <React.Fragment>
      <Title type="tvshows" isDetail={true} />
      <Routes>
        <Route
          path="/"
          element={
            <TVDetailContent
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              detail={tvDetail}
              casts={tvCasts}
              related={tvRelated}
              isFetching={isFetching}
              isError={isError}
            />
          }
        />
        <Route
          path="season/:number/*"
          element={<TVDetailMore id={id} name={tvDetail?.original_name} />}
        />
      </Routes>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tvDetail: state.detail.tvdetail,
    tvCasts: state.detail.tvcasts,
    tvRelated: state.detail.tvrelated,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchTVDetail,
  fetchTVCredits,
  fetchTVRelated,
})(TVDetail);
