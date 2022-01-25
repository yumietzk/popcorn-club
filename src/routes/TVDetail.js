import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTVDetail, fetchTVCredits, fetchTVRelated } from '../actions';
import Title from './Title';
import DetailMain from './detail/DetailMain';
import Seasons from './detail/Seasons';
import Cast from './detail/Cast';
import Related from './detail/Related';
import styles from './Detail.module.css';

const TVDetail = ({
  setDetailBackground,
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
    fetchTVDetail(id);
    fetchTVCredits(id);
    fetchTVRelated(id);
  }, [id]);

  useEffect(() => {
    setDetailBackground({
      isON: true,
      url: tvDetail?.backdrop_path,
    });
  }, [tvDetail]);

  return (
    <React.Fragment>
      <Title type="tvshows" isDetail={true} />
      <div className={styles.detail}>
        <DetailMain
          group="tvshow"
          data={tvDetail}
          isFetching={isFetching}
          isError={isError}
        />
        <Seasons data={tvDetail} isFetching={isFetching} isError={isError} />
        <Cast data={tvCasts} isFetching={isFetching} isError={isError} />
        <Related
          group="tvshow"
          data={tvRelated}
          isFetching={isFetching}
          isError={isError}
        />
      </div>
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