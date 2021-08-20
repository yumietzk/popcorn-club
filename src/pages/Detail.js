import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as IoIcons from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import { ActivityIndicator } from 'antd-mobile';
import {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
  saveMovie,
  deleteMovie,
  fetchFavoriteMovies,
} from '../actions';
import Cast from '../components/detail/Cast';
import Reviews from '../components/detail/Reviews';
import Related from '../components/detail/Related';
import history from '../history';
import styles from './Detail.module.css';

const Detail = ({
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
  fetchFavoriteMovies,
  saveMovie,
  deleteMovie,
  match,
  detail,
  favorites,
  moviecast,
  reviews,
  movierelated,
  isFetching,
  isError,
}) => {
  const [favorite, setFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [locationKeys, setLocationKeys] = useState([]);
  const btnhistory = useHistory();

  useEffect(() => {
    return btnhistory.listen((location) => {
      if (btnhistory.action === 'PUSH') {
        setLocationKeys([location.key]);
      }

      if (btnhistory.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          // Handle forward event
          return;
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          // Handle back event
          history.goBack();
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    const { id } = match.params;

    fetchMovieDetail(id);
    fetchMovieCredits(id);
    fetchMovieReviews(id);
    fetchMovieRelated(id);
    fetchFavoriteMovies();

    const isFavorite = (id) => {
      return favorites?.some((item) => item.id === +id);
    };

    setFavorite(isFavorite(id));
    // setLoading(false);
    setLoaded(false);
  }, [match.params]);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const calcHour = (runtime) => {
    const hr = Math.floor(runtime / 60);
    const min = runtime % 60;
    const hours = (hr) => {
      if (hr === 0) {
        return '';
      } else {
        return `${hr} hr`;
      }
    };
    return `${hours(hr)} ${min} min`;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  const onClick = (id, path, title, date) => {
    if (!favorite) {
      saveMovie(id, path, title, date);
      setFavorite(!favorite);
    } else {
      deleteMovie(id);
      setFavorite(!favorite);
    }
  };

  const renderDetail = () => {
    // if (!detail) {
    //   return (
    //     <div className={styles.loading}>
    //       <ActivityIndicator size="large" />
    //     </div>
    //   );
    // }

    if (isFetching || !detail) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.error}</p>;
    }

    return (
      <div className={styles.detail}>
        <div className={styles.fig}>
          <img
            src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
            alt={detail.original_title}
            className={`${styles.img} ${loaded && styles['img-open']}`}
            onLoad={onLoad}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            <h4 className={styles.titleName}>{detail.original_title}</h4>
            <button
              className={styles.favorite}
              onClick={() =>
                onClick(
                  detail.id,
                  detail.poster_path,
                  detail.original_title,
                  detail.release_date
                )
              }
            >
              <IoIcons.IoIosHeart
                className={
                  favorite
                    ? styles['favorite-icon-true']
                    : styles['favorite-icon']
                }
              />
            </button>
          </div>

          <p className={styles.date}>{calcYear(detail.release_date)}</p>

          <div className={styles.timerate}>
            <p className={styles.runtime}>{`${calcHour(detail.runtime)}`}</p>
            <div className={styles.rate}>
              <IoIcons.IoIosStar className={styles['rate-icon']} />
              <p>{detail.vote_average} / 10</p>
            </div>
          </div>

          <div className={styles.others}>
            <Link to={`/detail/${detail.id}/play`} className={styles.play}>
              <IoIcons.IoIosPlay className={styles['play-icon']} />
              <p>Play</p>
            </Link>
            <Link
              to={{ pathname: detail.homepage }}
              target="_blank"
              className={styles.link}
            >
              <IoIcons.IoIosLink className={styles['link-icon']} />
              <p>Website</p>
            </Link>
          </div>

          <p className={styles.overview}>{detail.overview}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.item}>
      <h3 className={styles.nav}>Movies</h3>

      <div className={styles.container}>
        {renderDetail()}

        <button className={styles['back-btn']} onClick={() => history.goBack()}>
          &larr; Back
        </button>

        <div className={styles.cast}>
          <Cast data={moviecast} isFetching={isFetching} isError={isError} />
        </div>

        <div className={styles.reviews}>
          <Reviews data={reviews} isFetching={isFetching} isError={isError} />
        </div>

        <div className={styles.related}>
          <Related
            type="movie"
            data={movierelated}
            isFetching={isFetching}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.detail.detail,
    favorites: state.movies.favorite,
    moviecast: state.detail.casts,
    reviews: state.detail.reviews,
    movierelated: state.detail.related,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
  saveMovie,
  deleteMovie,
  fetchFavoriteMovies,
})(Detail);
