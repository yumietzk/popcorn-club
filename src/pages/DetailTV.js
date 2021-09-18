import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import {
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVShow,
  deleteTVShow,
  fetchFavoriteTVs,
} from '../actions';
import Season from '../components/detail/Season';
import Cast from '../components/detail/Cast';
import Related from '../components/detail/Related';
import styles from './DetailTV.module.css';

const DetailTV = ({
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVShow,
  deleteTVShow,
  fetchFavoriteTVs,
  match,
  detail,
  favorites,
  tvcast,
  tvrelated,
  isFetching,
  isError,
  isSignedIn,
}) => {
  const [favorite, setFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { id } = match.params;

  useEffect(() => {
    fetchTvDetail(id);
    fetchTvCredits(id);
    fetchTvRelated(id);

    setLoaded(false);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      fetchFavoriteTVs();
    }
  }, [isSignedIn]);

  useEffect(() => {
    handleFavorite();
  }, [favorites]);

  const handleFavorite = () => {
    if (!favorites) {
      setFavorite(false);
    } else {
      const isFavorite = (id) => favorites.some((item) => item.id === +id);
      setFavorite(isFavorite(id));
    }
  };

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

  const onClickFavorite = (id, path, name, date) => {
    if (!favorite) {
      saveTVShow(id, path, name, date);
    } else {
      deleteTVShow(id);
    }
  };

  const onBrowserBack = () => {
    window.history.back();
  };

  const renderDetail = () => {
    if (isFetching || !detail) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    return (
      <div className={styles.detail}>
        <div className={styles.fig}>
          <img
            src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
            alt={detail.original_name}
            className={`${styles.img} ${loaded && styles['img-open']}`}
            onLoad={onLoad}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            <h4 className={styles.titleName}>{detail.original_name}</h4>
            {isSignedIn && (
              <button
                className={styles.favorite}
                onClick={() =>
                  onClickFavorite(
                    detail.id,
                    detail.poster_path,
                    detail.original_name,
                    detail.first_air_date
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
            )}
          </div>

          <p className={styles.date}>{calcYear(detail.first_air_date)}</p>

          <div className={styles.timerate}>
            <p className={styles.runtime}>
              {`${calcHour(detail.episode_run_time[0])}`}
            </p>
            <div className={styles.rate}>
              <IoIcons.IoIosStar className={styles['rate-icon']} />
              <p>{detail.vote_average}</p>
            </div>
          </div>

          <div className={styles.others}>
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
      <h3 className={styles.nav}>TV Shows</h3>

      <div className={styles.container}>
        {renderDetail()}

        <button className={styles['back-btn']} onClick={onBrowserBack}>
          &larr; Back
        </button>

        <div className={styles.seasons}>
          <Season data={detail} isFetching={isFetching} isError={isError} />
        </div>

        <div className={styles.cast}>
          <Cast data={tvcast} isFetching={isFetching} isError={isError} />
        </div>

        <div className={styles.related}>
          <Related
            type="tv"
            data={tvrelated}
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
    detail: state.detail.tvdetail,
    favorites: state.shows.favorite,
    tvcast: state.detail.tvcasts,
    tvrelated: state.detail.tvrelated,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVShow,
  deleteTVShow,
  fetchFavoriteTVs,
})(DetailTV);
