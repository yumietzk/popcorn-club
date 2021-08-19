import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ReactLoading from 'react-loading';
import * as IoIcons from 'react-icons/io';
import {
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVShow,
  deleteTVShow,
} from '../actions';
import Season from '../components/detail/Season';
import Cast from '../components/detail/Cast';
import Related from '../components/detail/Related';
import history from '../history';
import styles from './DetailTV.module.css';

const DetailTV = ({
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVShow,
  deleteTVShow,
  match,
  favorites,
  detail,
}) => {
  const [favorite, setFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { id } = match.params;

    fetchTvDetail(id);
    fetchTvCredits(id);
    fetchTvRelated(id);

    // const isFavorite = (id) => {
    //   return props.favorite?.some((item) => item.id === +id);
    // };

    setFavorite(isFavorite(id));
    setLoaded(false);
  }, [match.params]);

  const isFavorite = (id) => {
    return favorites?.some((item) => item.id === +id);
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

  const onClick = (id, path, name, date) => {
    if (!favorite) {
      saveTVShow(id, path, name, date);
      setFavorite(!favorite);
    } else {
      deleteTVShow(id);
      setFavorite(!favorite);
    }
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.item}>
      <h3 className={styles.nav}>TV Shows</h3>

      <div className={styles.container}>
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
              <button
                className={styles.favorite}
                onClick={() =>
                  onClick(
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

        <button className={styles['back-btn']} onClick={() => history.goBack()}>
          &larr; Back
        </button>

        <div className={styles.seasons}>
          <Season />
        </div>

        <div className={styles.cast}>
          <Cast type="tv" />
        </div>

        <div className={styles.related}>
          <Related type="tv" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.detail.tvdetail,
    favorites: state.shows.favorite,
  };
};

export default connect(mapStateToProps, {
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVShow,
  deleteTVShow,
})(DetailTV);
