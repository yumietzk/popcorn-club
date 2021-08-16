import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import {
  fetchTvDetail,
  fetchTvCredits,
  fetchTvRelated,
  saveTVs,
} from '../actions';
import Season from '../components/detail/Season';
import Cast from '../components/detail/Cast';
import Related from '../components/detail/Related';
import styles from './DetailTV.module.css';

const DetailTV = (props) => {
  // Use useState for setting selected id
  // const [selectedShow, setSelectedShow] = useState(1668);

  // Also movies added in the favorite could be stored in state. So, use redux for that?

  useEffect(() => {
    const { id } = props.match.params;

    props.fetchTvDetail(id);
    props.fetchTvCredits(id);
    props.fetchTvRelated(id);
  }, []);

  const calcYear = (date) => {
    // const year = date.slice(0, 4);
    // return year;
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

  const onClick = (id, path, name, date) => {
    props.saveTVs(id, path, name, date);
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
              className={styles.img}
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
                <IoIcons.IoIosHeart className={styles['favorite-icon']} />
              </button>
            </div>
            <p className={styles.date}>
              {calcYear(props.detail.first_air_date)}
            </p>
            <div className={styles.timerate}>
              <p className={styles.runtime}>
                {`${calcHour(props.detail.episode_run_time)}`}
              </p>
              <p className={styles.rate}>
                <IoIcons.IoIosStar className={styles['rate-icon']} />
                <p>{props.detail.vote_average}</p>
              </p>
            </div>

            {/* Have to consider when there are multiple genres */}
            {/* <p className={styles.genre}>{selectedMovie.genres[0].name}</p> */}

            <div className={styles.others}>
              <Link
                to={`/detailtv/${props.detail.id}/play`}
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

        {/* <div className={styles.cast}>
          <CastWrap />
        </div>

        <div className={styles.reviews}>
          <Reviews />
        </div>

        <div className={styles.related}>
          <Related />
        </div> */}

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
  // console.log(state.detail.detail);
  return {
    detail: state.detail.tvdetail,
  };
};

export default connect(mapStateToProps, {
  fetchTvDetail: fetchTvDetail,
  fetchTvCredits: fetchTvCredits,
  fetchTvRelated: fetchTvRelated,
  saveTVs: saveTVs,
})(DetailTV);
