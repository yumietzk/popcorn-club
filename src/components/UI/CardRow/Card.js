import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
// import { fetchTVDetail } from '../../../actions';
import { truncate } from '../../../helpers/Truncate';
import styles from './Card.module.css';

const Card = ({
  group,
  data,
  cname,
  // fetchTVDetail,
  detail,
  isFetching,
  isError,
}) => {
  const [loaded, setLoaded] = useState(false);

  // if group === tv detail, create render function

  useEffect(() => {
    setLoaded(false);
  }, []);

  // useEffect(() => {
  //   if (group === 'TV Show') {
  //     fetchTVDetail(data.id);
  //   }
  // }, [data.id]);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <React.Fragment>
      <div className={styles.img}>
        <img
          className={`${styles.poster} ${
            cname === 'grid' && styles['grid-poster']
          } ${loaded && styles['poster-open']}`}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.original_title ? data.original_title : data.original_name}
          onLoad={onLoad}
        />
        <div className={styles.cover}>
          <button className={styles['cover-btn']}>
            <RiIcons.RiArrowRightSFill className={styles['cover-icon']} />
          </button>
        </div>
      </div>
      <Link
        to={
          group === 'Movie'
            ? `../../detail/${data.id}`
            : `../../tvdetail/${data.id}`
        }
        className={styles.title}
      >
        {group === 'tv detail'
          ? data.name
          : data.original_title
          ? truncate(data.original_title, 24)
          : truncate(data.original_name, 24)}
      </Link>
      <p className={styles.dateseason}>
        {group === 'tv detail'
          ? `${data.episode_count} episodes`
          : calcYear(
              data.release_date ? data.release_date : data.first_air_date
            )}
      </p>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.detail.tvdetail,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  // fetchTVDetail,
})(Card);
