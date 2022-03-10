import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { fetchTVDetail, fetchTVCasts, fetchTVRelated } from '../../actions';
import Title from '../../components/Title';
import TVDetailContent from './TVDetailContent';
import TVDetailMore from './TVDetailMore';

const TVDetail = ({
  setSelectedItem,
  setIsAscend,
  setDetailBackground,
  setIsDetail,
  width,
  fetchTVDetail,
  fetchTVCasts,
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
    fetchTVCasts(id);
    fetchTVRelated(id);
  }, [id]);

  useEffect(() => {
    setDetailBackground({
      isON: true,
      url: tvDetail?.backdrop_path || tvDetail?.poster_path,
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
              setSelectedItem={setSelectedItem}
              setIsAscend={setIsAscend}
              width={width}
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
          element={
            <TVDetailMore
              id={id}
              name={tvDetail?.original_name}
              width={width}
            />
          }
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
  fetchTVCasts,
  fetchTVRelated,
})(TVDetail);
