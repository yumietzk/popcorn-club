import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
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
import styles from './DetailTV.module.css';

const DetailTV = (props) => {
  const [favorite, setFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { id } = props.match.params;

    props.fetchTvDetail(id);
    props.fetchTvCredits(id);
    props.fetchTvRelated(id);

    const isFavorite = (id) => {
      return props.favorite?.some((item) => item.id === +id);
    };

    setFavorite(isFavorite(id));
  }, [props]);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const calcHour = (runtime) => {
    // 139 -> 2hr 19min
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
      props.saveTVShow(id, path, name, date);
      setFavorite(!favorite);
    } else {
      props.deleteTVShow(id);
      setFavorite(!favorite);
    }
  };

  if (!props.detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.item}>
      <h3 className={styles.nav}>TV Shows</h3>

      <div className={styles.container}>
        <div className={styles.detail}>
          <div className={styles.fig}>
            <img
              src={`https://image.tmdb.org/t/p/original${props.detail.poster_path}`}
              alt={props.detail.original_name}
              className={`${styles.img} ${loaded && styles['img-open']}`}
              onLoad={onLoad}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.title}>
              <h4 className={styles.titleName}>{props.detail.original_name}</h4>
              <button
                className={styles.favorite}
                onClick={() =>
                  onClick(
                    props.detail.id,
                    props.detail.poster_path,
                    props.detail.original_name,
                    props.detail.first_air_date
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

            <p className={styles.date}>
              {calcYear(props.detail.first_air_date)}
            </p>

            <div className={styles.timerate}>
              <p className={styles.runtime}>
                {`${calcHour(props.detail.episode_run_time[0])}`}
              </p>
              <div className={styles.rate}>
                <IoIcons.IoIosStar className={styles['rate-icon']} />
                <p>{props.detail.vote_average}</p>
              </div>
            </div>

            <div className={styles.others}>
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
    favorite: state.shows.favorite,
  };
};

export default connect(mapStateToProps, {
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVShow,
  deleteTVShow,
})(DetailTV);
