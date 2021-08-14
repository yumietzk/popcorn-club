import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFavoriteTVs } from '../../actions';
import tmdb from '../../apis/tmdb';
import styles from './TvCard.module.css';

const TvCard = (props) => {
  useEffect(() => {
    props.fetchFavoriteTVs();
  }, []);

  const handleSearchDetail = () => {
    const searchDetail = async () => {
      const response = await tmdb.get(
        '/movie/550?api_key=8a45061d820fb7b5b5f574766f028ff6'
      );

      console.log(response.data);
    };

    searchDetail();
  };

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderMovies = () => {
    if (!props.shows) {
      return <div>Loading...</div>;
    }

    return props.shows?.map((show) => {
      return (
        <Link
          to={`/detailtv/${show.id}`}
          key={show.id}
          className={`${styles.card} ${styles[props.cname]}`}
          onClick={handleSearchDetail}
        >
          <div className={styles.img}>
            <img
              className={styles.poster}
              src={
                props.cname
                  ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
                  : `https://image.tmdb.org/t/p/original${show.poster_path}`
              }
              alt={show.original_name}
            />
          </div>
          {props.cname ? (
            ''
          ) : (
            <p className={styles.title}>{show.original_name}</p>
          )}
          {props.cname ? (
            ''
          ) : (
            <p className={styles.title}>{calcYear(show.first_air_date)}</p>
          )}
        </Link>
      );
    });
  };

  return <React.Fragment>{renderMovies()}</React.Fragment>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    shows: state.shows[ownProps.type],
  };
};

export default connect(mapStateToProps, {
  fetchFavoriteTVs,
})(TvCard);
