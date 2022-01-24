import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../actions';
import Title from './Title';
import DetailMain from './detail/DetailMain';
import Cast from './detail/Cast';
import Reviews from './detail/Reviews';
import Related from './detail/Related';
import styles from './Detail.module.css';

const Detail = ({
  setDetailBackground,
  fetchMovieDetail,
  movieDetail,
  isFetching,
  isError,
}) => {
  const { id } = useParams();

  useEffect(() => {
    fetchMovieDetail(id);
  }, [id]);

  useEffect(() => {
    setDetailBackground({
      isON: true,
      url: movieDetail?.poster_path,
    });
  }, [movieDetail]);

  // useEffect(() => {
  //   if (!movieDetail) {
  //     console.log('No data');
  //     return;
  //   }

  //   setDetailBackground({
  //     isON: true,
  //     data: movieDetail.poster_path,
  //   });
  // }, [movieDetail]);

  return (
    <React.Fragment>
      <Title type="movies" isDetail={true} />
      <div className={styles.detail}>
        <DetailMain
          data={movieDetail}
          isFetching={isFetching}
          isError={isError}
        />
        <Cast />
        <Reviews />
        <Related />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movieDetail: state.detail.detail,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMovieDetail,
})(Detail);
