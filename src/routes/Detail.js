import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchMovieDetail,
  fetchMovieCasts,
  fetchMovieReviews,
  fetchMovieRelated,
} from '../actions';
import Title from './Title';
import DetailMain from './detail/DetailMain';
import Cast from './detail/Cast';
import Reviews from './detail/Reviews';
import Related from './detail/Related';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './Detail.module.css';

// movieとtvを統合できるはず
// fetchするとき、groupでmovieかtvか、typeでdetail, credits, reviews, relatedの何かをパラメータで渡してaction creatorも統合できるはず
const Detail = ({
  setSelectedItem,
  setIsAscend,
  setDetailBackground,
  setIsDetail,
  width,
  fetchMovieDetail,
  fetchMovieCasts,
  fetchMovieReviews,
  fetchMovieRelated,
  movieDetail,
  movieCasts,
  movieReviews,
  movieRelated,
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
    fetchMovieDetail(id);
    fetchMovieCasts(id);
    fetchMovieReviews(id);
    fetchMovieRelated(id);
  }, [id]);

  useEffect(() => {
    setDetailBackground({
      isON: true,
      url: movieDetail?.backdrop_path || movieDetail?.poster_path,
    });

    return () => {
      setDetailBackground({
        isON: false,
        url: '',
      });
    };
  }, [movieDetail]);

  const renderDetail = () => {
    if (
      isFetching ||
      !movieDetail ||
      !movieCasts ||
      !movieReviews ||
      !movieRelated
    ) {
      return <LoadingIndicator />;
    }

    if (isError?.status) {
      return <p className={styles.error}>{isError.errorMessage}</p>;
    }

    if (movieDetail && movieCasts && movieReviews && movieRelated) {
      return (
        <React.Fragment>
          <DetailMain
            setSelectedItem={setSelectedItem}
            setIsAscend={setIsAscend}
            group="movies"
            data={movieDetail}
            width={width}
          />
          <Cast data={movieCasts} width={width} />
          <Reviews data={movieReviews} width={width} />
          <Related group="movies" data={movieRelated} width={width} />
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Title type="movies" isDetail={true} />
      <div className={`${styles.detail} ${isFetching ? styles.loading : null}`}>
        {renderDetail()}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movieDetail: state.detail.detail,
    movieCasts: state.detail.casts,
    movieReviews: state.detail.reviews,
    movieRelated: state.detail.related,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMovieDetail,
  fetchMovieCasts,
  fetchMovieReviews,
  fetchMovieRelated,
})(Detail);
