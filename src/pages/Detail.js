import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
  saveMovies,
  deleteMovie,
  fetchFavoriteMovies,
} from '../actions';
import CastWrap from '../components/detail/Cast';
import Reviews from '../components/detail/Reviews';
import Related from '../components/detail/Related';
import styles from './Detail.module.css';

const Detail = (props) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const { id } = props.match.params;

    props.fetchMovieDetail(id);
    props.fetchMovieCredits(id);
    props.fetchMovieReviews(id);
    props.fetchMovieRelated(id);
    props.fetchFavoriteMovies();

    const isFavorite = (id) => {
      return props.favorite?.some((item) => item.id === +id);
    };

    setFavorite(isFavorite(id));
  }, []);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const calcHour = (runtime) => {
    // 139 -> 2hr 19min
    const hr = Math.floor(runtime / 60);
    const min = runtime % 60;
    return `${hr} hr ${min} min`;
  };

  const onClick = (id, path, title, date) => {
    if (!favorite) {
      props.saveMovies(id, path, title, date);
      setFavorite(!favorite);
    } else {
      props.deleteMovie(id);
      setFavorite(!favorite);
    }
  };

  if (!props.detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.item}>
      <h3 className={styles.nav}>Movies</h3>
      <div className={styles.container}>
        <div className={styles.detail}>
          <div className={styles.fig}>
            <img
              src={`https://image.tmdb.org/t/p/original${props.detail.poster_path}`}
              alt={props.detail.original_title}
              className={styles.img}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              <h4 className={styles.titleName}>
                {props.detail.original_title}
              </h4>
              <button
                className={styles.favorite}
                onClick={() =>
                  onClick(
                    props.detail.id,
                    props.detail.poster_path,
                    props.detail.original_title,
                    props.detail.release_date
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
            <p className={styles.date}>{calcYear(props.detail.release_date)}</p>
            <div className={styles.timerate}>
              <p className={styles.runtime}>
                {`${calcHour(props.detail.runtime)}`}
              </p>
              <p className={styles.rate}>
                <IoIcons.IoIosStar className={styles['rate-icon']} />
                <p>{props.detail.vote_average} / 10</p>
              </p>
            </div>

            {/* Have to consider when there are multiple genres */}
            {/* <p className={styles.genre}>{selectedMovie.genres[0].name}</p> */}

            <div className={styles.others}>
              <Link
                to={`/detail/${props.detail.id}/play`}
                className={styles.play}
              >
                <IoIcons.IoIosPlay className={styles['play-icon']} />
                <p>Play</p>
              </Link>
              <Link
                to={{ pathname: props.detail.homepage }}
                target="_blank"
                className={styles.link}
              >
                <IoIcons.IoIosLink className={styles['link-icon']} />
                <p>Website</p>
              </Link>
            </div>
            <p className={styles.overview}>{props.detail.overview}</p>
          </div>
        </div>

        <div className={styles.cast}>
          <CastWrap />
        </div>

        <div className={styles.reviews}>
          <Reviews />
        </div>

        <div className={styles.related}>
          <Related />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.detail.detail);
  return {
    detail: state.detail.detail,
    favorite: state.movies.favorite,
  };
};

export default connect(mapStateToProps, {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
  saveMovies,
  deleteMovie,
  fetchFavoriteMovies,
})(Detail);
